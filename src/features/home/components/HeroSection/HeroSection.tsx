import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideIn } from "@/components/motion/SlideIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/constants";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section
      aria-label="World Cup 2026 hero"
      className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4 py-24"
    >
      {/* Atmospheric background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,oklch(0.65_0.26_264_/_0.13),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_25%_at_50%_60%,oklch(0.65_0.26_264_/_0.07),transparent)]" />
      </div>

      {/* Content */}
      <Container size="xl" className="relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <FadeIn delay={0.1}>
          <Badge
            variant="brand"
            className="mb-8 gap-1.5 px-4 py-1 text-xs tracking-widest uppercase"
          >
            <span aria-hidden="true">⚽</span>
            FIFA World Cup 2026
          </Badge>
        </FadeIn>

        {/* Main title */}
        <SlideIn direction="up" delay={0.25} duration={0.6}>
          <h1 className="mb-3 text-[clamp(3.5rem,10vw,8rem)] leading-none font-extrabold tracking-tighter">
            <span className="from-foreground via-foreground to-foreground/50 bg-gradient-to-br bg-clip-text text-transparent">
              WORLD CUP
            </span>
            <br />
            <span className="text-brand drop-shadow-[0_0_40px_oklch(0.65_0.26_264_/_0.6)]">
              2026
            </span>
          </h1>
        </SlideIn>

        {/* Host nations */}
        <FadeIn delay={0.45}>
          <div
            className="text-brand/60 mb-6 flex items-center gap-3 text-sm font-semibold tracking-widest uppercase"
            aria-label="Host nations: USA, Canada, Mexico"
          >
            <span>🇺🇸 USA</span>
            <span className="text-border/60" aria-hidden="true">
              ·
            </span>
            <span>🇨🇦 Canada</span>
            <span className="text-border/60" aria-hidden="true">
              ·
            </span>
            <span>🇲🇽 Mexico</span>
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.6}>
          <p className="text-muted-foreground mb-10 max-w-[480px] text-lg leading-relaxed">
            The greatest football tournament in history.
            <br />
            48 nations. 104 matches. One world champion.
          </p>
        </FadeIn>

        {/* CTAs */}
        <SlideIn direction="up" delay={0.75} duration={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="glow" size="lg" asChild>
              <Link to={ROUTES.MATCHES}>View Schedule</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to={ROUTES.TEAMS}>Explore Teams</Link>
            </Button>
          </div>
        </SlideIn>
      </Container>

      {/* Bottom gradient fade-out */}
      <div
        className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
