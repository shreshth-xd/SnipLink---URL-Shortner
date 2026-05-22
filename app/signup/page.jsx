"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, Eye, EyeOff, ArrowRight, Zap, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PasswordStrengthIndicator({ password }) {
  const checks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
  ];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      {checks.map((check) => (
        <div key={check.label} className="flex items-center gap-2">
          {check.valid ? (
            <Check className="h-3 w-3 text-primary shrink-0" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground/50 shrink-0" />
          )}
          <span
            className={`text-xs transition-colors ${
              check.valid ? "text-primary" : "text-muted-foreground/50"
            }`}
          >
            {check.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsMismatch = password && confirmPassword && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const isFormValid = username && email && password && confirmPassword && password === confirmPassword;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
            <Link2 className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Sniplink</span>
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary w-fit mx-auto">
              <Zap className="h-3.5 w-3.5" />
              <span>Get started free</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Start shortening links in seconds
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-foreground">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="h-12 rounded-xl border-border/50 bg-card/50 px-4 text-base backdrop-blur-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-12 rounded-xl border-border/50 bg-card/50 px-4 text-base backdrop-blur-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="h-12 rounded-xl border-border/50 bg-card/50 px-4 pr-12 text-base backdrop-blur-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <PasswordStrengthIndicator password={password} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirm password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={`h-12 rounded-xl border-border/50 bg-card/50 px-4 pr-12 text-base backdrop-blur-sm transition-all placeholder:text-muted-foreground/50 focus:ring-2 ${
                    passwordsMismatch
                      ? "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20"
                      : passwordsMatch
                      ? "border-primary/50 focus:border-primary/50 focus:ring-primary/20"
                      : "focus:border-primary/50 focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordsMismatch && (
                <p className="text-xs text-destructive-foreground flex items-center gap-1.5">
                  <X className="h-3 w-3" />
                  Passwords do not match
                </p>
              )}
              {passwordsMatch && (
                <p className="text-xs text-primary flex items-center gap-1.5">
                  <Check className="h-3 w-3" />
                  Passwords match
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="h-12 w-full rounded-xl bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_var(--glow)] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Create account</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          By creating an account, you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-muted-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-muted-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
