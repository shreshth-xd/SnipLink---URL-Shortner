import { Zap, Shield, BarChart3, Globe, Code2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects happen in milliseconds. Your users won't notice any delay.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with 99.9% uptime guarantee for your links.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track clicks, geographic data, and referrers with real-time insights.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description:
      "Use your own domain to maintain brand consistency across all links.",
  },
  {
    icon: Code2,
    title: "Developer API",
    description:
      "Full-featured REST API with SDKs for JavaScript, Python, and more.",
  },
  {
    icon: Sparkles,
    title: "Smart Links",
    description:
      "Create dynamic links with A/B testing and device-based redirects.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-4 py-24 sm:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/3 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to
            <br />
            <span className="text-primary">manage your links</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Powerful features designed for developers and teams who need
            reliable, fast, and insightful link management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-all group-hover:ring-primary/40 group-hover:shadow-[0_0_20px_var(--glow)]">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
