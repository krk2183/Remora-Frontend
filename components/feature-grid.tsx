import { GitBranch, ShieldOff, Zap } from "lucide-react"

const features = [
  {
    icon: GitBranch,
    title: "Git Webhook Automation",
    description: "Monitors your repository in real-time. When context drift is detected, Remora automatically injects constraints via commit hooks and PR checks.",
    badge: "Automated",
  },
  {
    icon: ShieldOff,
    title: "Negative Constraint Injection",
    description: "Rather than telling the agent what to do, Remora tells it what NOT to do. Explicit boundaries prevent runaway token consumption and scope creep.",
    badge: "Core",
  },
  {
    icon: Zap,
    title: "Zero-Config Integration",
    description: "One webhook URL. Drop it into your GitHub settings and you're protected. No SDK, no dependencies, no configuration files to manage.",
    badge: "Simple",
  },
]

export function FeatureGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((feature, i) => (
        <div
          key={i}
          className="group relative rounded-lg border border-border/50 bg-card p-6 transition-colors hover:border-border hover:bg-secondary/30"
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-secondary/50">
              <feature.icon className="h-5 w-5 text-foreground/70" />
            </div>
            <span className="rounded bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {feature.badge}
            </span>
          </div>
          <h3 className="mb-2 text-base font-medium text-foreground">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}
