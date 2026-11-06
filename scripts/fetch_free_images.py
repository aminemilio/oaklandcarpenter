#!/usr/bin/env python3
"""Fetch CC-licensed images from Wikimedia Commons (rate-limited friendly)."""
import json
import urllib.parse
import urllib.request
import re
import time

def strip_html(s):
    return re.sub(r'<[^<]+?>', '', s or '').strip()

def search_commons(query, limit=5):
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
        "User-Agent": "OaklandCarpenterDirectory/1.0 (contact@example.com) educational project"
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
            "originalurl": ii.get("url", ""),
            "license": strip_html(meta.get("LicenseShortName", {}).get("value", "?")),
            "license_url": strip_html(meta.get("LicenseUrl", {}).get("value", "")),
            "attribution": strip_html(meta.get("Artist", {}).get("value", "")),
            "description": strip_html(meta.get("ImageDescription", {}).get("value", ""))[:160],
            "width": ii.get("width"),
            "height": ii.get("height"),
        })
    return results

queries = [
    ("hero_workshop", "carpentry workshop"),
    ("modern_kitchen", "modern kitchen interior"),
    ("luxury_living_room", "luxury living room"),
    ("custom_cabinets", "kitchen cabinets wooden"),
    ("deck_pergola", "wooden deck patio"),
    ("hardwood_floor", "hardwood floor room"),
    ("wooden_staircase", "wooden staircase interior"),
    ("custom_furniture", "handcrafted wooden furniture"),
    ("carpentry_tools", "carpentry tools workbench"),
    ("finish_carpentry", "crown molding interior"),
]

output = {}
for i, (key, q) in enumerate(queries):
    print(f"[{i+1}/{len(queries)}] {key}: {q}", flush=True)
    for attempt in range(3):
        try:
            results = search_commons(q, limit=5)
            # Sort: prefer CC0 / Public domain first, then CC BY (any version), then CC BY-SA
            license_priority = {
                "CC0": 0, "Public domain": 0, "PDMark": 0,
                "CC BY 4.0": 1, "CC BY 3.0": 1, "CC BY 2.5": 1, "CC BY 2.0": 1, "CC BY 1.0": 1,
                "CC BY-SA 4.0": 2, "CC BY-SA 3.0": 2, "CC BY-SA 2.5": 2, "CC BY-SA 2.0": 2,
            }
            results.sort(key=lambda r: license_priority.get(r["license"], 3))
            output[key] = results[:3]
            for r in results[:3]:
                print(f"  [{r['license']:18}] {r['thumburl']}", flush=True)
                print(f"    -> {r['description'][:100]}", flush=True)
            break
        except Exception as e:
            print(f"  attempt {attempt+1} ERROR: {e}", flush=True)
            if attempt < 2:
                time.sleep(8)
    time.sleep(3)  # be nice to the API

with open("/tmp/free_images.json", "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\nSaved {sum(len(v) for v in output.values())} images across {len(output)} categories to /tmp/free_images.json")
