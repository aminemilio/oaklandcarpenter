"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export function ContactView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !topic || !message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Invalid email address", variant: "destructive" });
      return;
    }
    // For MVP — opens the user's email client with a pre-filled message
    const subject = `[${topic}] Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
    window.location.href = `mailto:hello@oaklandcarpenter.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    toast({ title: "Opening your email client…", description: "If nothing happens, email hello@oaklandcarpenter.com directly." });
  };

  return (
    <div>
      <section className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary to-background border-b border-border">
        <div className="relative h-full mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-3 w-fit">
            <ChevronLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Contact us</h1>
          <p className="mt-2 text-sm text-muted-foreground">Questions, corrections, or listing removal requests</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          {/* Left: contact info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <Mail className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold mb-1">Email us</h3>
                <p className="text-sm text-muted-foreground mb-2">For general questions, listing submissions, and corrections.</p>
                <a href="mailto:hello@oaklandcarpenter.com" className="text-sm text-primary hover:underline break-all">
                  hello@oaklandcarpenter.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <MessageSquare className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold mb-1">Privacy & data</h3>
                <p className="text-sm text-muted-foreground mb-2">For privacy requests, data deletion, or CCPA inquiries.</p>
                <a href="mailto:privacy@oaklandcarpenter.com" className="text-sm text-primary hover:underline break-all">
                  privacy@oaklandcarpenter.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <Clock className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold mb-1">Response time</h3>
                <p className="text-sm text-muted-foreground">We respond to all inquiries within <strong className="text-foreground">3 business days</strong>. Listing removal requests are processed within 5 business days.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <MapPin className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">Oakland, California<br />Serving the entire state</p>
              </CardContent>
            </Card>
          </div>

          {/* Right: contact form */}
          <div>
            {submitted ? (
              <Card className="border-primary/30">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h2 className="text-lg font-semibold mb-2">Your email is ready!</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    We&apos;ve opened your email client with a pre-filled message to hello@oaklandcarpenter.com. If your email client didn&apos;t open, send your message manually.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button asChild>
                      <a href="mailto:hello@oaklandcarpenter.com">Open email manually</a>
                    </Button>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send another message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Send us a message</h2>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Your name <span className="text-destructive">*</span></Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="topic">Topic <span className="text-destructive">*</span></Label>
                      <Select value={topic} onValueChange={setTopic}>
                        <SelectTrigger id="topic">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General question</SelectItem>
                          <SelectItem value="listing-submission">Listing submission question</SelectItem>
                          <SelectItem value="listing-correction">Correction to my listing</SelectItem>
                          <SelectItem value="listing-removal">Remove my listing</SelectItem>
                          <SelectItem value="privacy">Privacy / data request</SelectItem>
                          <SelectItem value="advertising">Advertising / partnership</SelectItem>
                          <SelectItem value="bug">Report a bug or broken link</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you need…"
                        rows={6}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        We respond within 3 business days.
                      </p>
                      <Button type="submit">
                        <Send className="h-4 w-4 mr-2" />
                        Send message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <p className="text-xs text-muted-foreground mt-4 text-center">
              By submitting this form, you agree to our{" "}
              <Link href="/?view=privacy" className="text-primary hover:underline">Privacy Policy</Link>
              {" "}and{" "}
              <Link href="/?view=terms" className="text-primary hover:underline">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
