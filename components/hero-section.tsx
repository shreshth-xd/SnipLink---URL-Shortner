"use client";

import { useState } from "react";
import { ArrowRight, Copy, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setShortenedUrl(`snip.link/${Math.random().toString(36).substring(2, 8)}`);
    setIsLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://${shortenedUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">
          <Zap className="h-3.5 w-3.5" />
          <span>Lightning-fast URL shortening</span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-foreground">Shorten URLs,</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary to-emerald-400 bg-clip-text text-transparent">
            Amplify Reach
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mb-12 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:text-xl">
          Transform any URL into a clean, memorable link. Built for developers,
          trusted by teams worldwide.
        </p>

        {/* URL Input Form */}
        <form
          onSubmit={handleShorten}
          className="relative w-full max-w-2xl"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Input
                type="url"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 rounded-xl border-border/50 bg-card/50 px-5 text-base backdrop-blur-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !url}
              className="h-14 rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_var(--glow)] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  <span>Shortening...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Shorten</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Shortened URL Result */}
        {shortenedUrl && (
          <div className="mt-6 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">
                    Your shortened URL
                  </p>
                  <p className="font-mono text-sm font-medium text-primary sm:text-base">
                    https://{shortenedUrl}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-primary/30 bg-transparent hover:bg-primary/10"
              >
                {copied ? (
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-primary">Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center sm:gap-16">
          <div>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">10M+</p>
            <p className="text-sm text-muted-foreground">Links created</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">99.9%</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{"<"}50ms</p>
            <p className="text-sm text-muted-foreground">Redirect time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
