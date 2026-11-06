#!/usr/bin/env python3
"""Fetch many unique CC-licensed images from Wikimedia Commons.
Staggered queries with delays to avoid rate limiting.
Saves results to /tmp/more_images.json with full URLs + license metadata.
"""
import json
import urllib.parse
import urllib.request
import re
import time

def strip_html(s):
    return re.sub(r'<[^<]+?>', '', s or '').strip()

def search_commons(query, limit=8):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrnamespace": "6",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrlimit": str(limit),
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": "1600",
    }
    full_url = f"{url}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(full_url, headers={
        "User-Agent": "OaklandCarpenterDirectory/1.0 (educational project; contact@example.com)"
    })
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read().decode("utf-8"))
    pages = data.get("query", {}).get("pages", {})
    results = []
    for page in pages.values():
        ii = (page.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata", {}) or {}
        results.append({
            "title": page.get("title", ""),
            "thumburl": ii.get("thumburl", ""),
            "license": strip_html(meta.get("LicenseShortName", {}).get("value", "?")),
            "license_url": strip_html(meta.get("LicenseUrl", {}).get("value", "")),
            "attribution": strip_html(meta.get("Artist", {}).get("value", ""))[:80],
            "description": strip_html(meta.get("ImageDescription", {}).get("value", ""))[:140],
        })
    return results

# Many targeted queries to get unique images per service/category
queries = [
    ("custom_cabinets_2",   "kitchen island wooden bar"),
    ("custom_cabinets_3",   "built in bookshelf wood library"),
    ("custom_cabinets_4",   "wardrobe closet wooden bedroom"),
    ("deck_2",              "garden terrace wood patio modern"),
    ("deck_3",              "backyard porch wooden fence"),
    ("framing_2",           "timber frame house structure"),
    ("framing_3",           "roof trusses wood construction"),
    ("trim_2",              "wainscoting paneling wall interior"),
    ("trim_3",              "door frame casing interior wood"),
    ("furniture_2",         "wooden chair handmade craft"),
    ("furniture_3",         "oak dining table set room"),
    ("flooring_2",          "parquet floor pattern herringbone"),
    ("flooring_3",          "oak plank floor texture"),
    ("staircase_2",         "spiral staircase wooden modern"),
    ("staircase_3",         "staircase railing wood baluster"),
    ("workshop_2",          "sawdust carpenter hands work"),
    ("workshop_3",          "wood plank lumber stack"),
    ("door_window",         "wooden front door entrance house"),
    ("door_window_2",       "casement window wood frame house"),
    ("finished_home_2",     "modern dining room interior wood"),
    ("finished_home_3",     "scandinavian living room wood"),
    ("finished_home_4",     "home office wooden desk study"),
    ("craftsman",           "woodworker hands chisel carving"),
]

output = {}
total_saved = 0
for i, (key, q) in enumerate(queries):
    print(f"[{i+1}/{len(queries)}] {key}: {q}", flush=True)
    for attempt in range(2):
        try:
            results = search_commons(q, limit=4)
            # Prefer CC0 / Public domain
            license_priority = {
                "CC0": 0, "Public domain": 0, "PDMark": 0,
                "CC BY 4.0": 1, "CC BY 3.0": 1, "CC BY 2.5": 1, "CC BY 2.0": 1,
                "CC BY-SA 4.0": 2, "CC BY-SA 3.0": 2, "CC BY-SA 2.0": 2,
            }
            results.sort(key=lambda r: license_priority.get(r["license"], 3))
            # Take top 2
            top = results[:2]
            output[key] = top
            for r in top:
                print(f"  [{r['license']:18}] {r['thumburl'][:90]}", flush=True)
                print(f"    -> {r['description'][:90]}", flush=True)
            total_saved += len(top)
            break
        except Exception as e:
            print(f"  attempt {attempt+1} ERROR: {e}", flush=True)
            if attempt < 1:
                time.sleep(15)
    # Be very nice to the API — 5 second delay between queries
    time.sleep(5)

with open("/tmp/more_images.json", "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\nSaved {total_saved} images across {len(output)} categories to /tmp/more_images.json")
