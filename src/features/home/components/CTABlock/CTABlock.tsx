import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideIn } from "@/components/motion/SlideIn";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/constants";
import { Link } from "react-router-dom";

type CTABlockProps = {
  title?: string;
  description?: string;
};

export function CTABlock({
  title = "The 2026 World Cup Awaits",
  description = "Follow every match, track your favourite teams, and experience the tournament like never before.",
}: CTABlockProps) {
  return (
    <section
      aria-label="Call to action"
      className="border-border/30 relative overflow-hidden border-t py-24"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,oklch(0.65_0.26_264_/_0.08),transparent)]"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10 flex flex-col items-center text-center">
        <FadeIn>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight lg:text-4xl">{title}</h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-muted-foreground mb-10 max-w-lg text-lg leading-relaxed">
            {description}
          </p>
        </FadeIn>

        <SlideIn direction="up" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="glow" size="lg" asChild>
              <Link to={ROUTES.MATCHES}>View Full Schedule</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to={ROUTES.GROUPS}>Explore Groups</Link>
            </Button>
          </div>
        </SlideIn>
      </Container>
    </section>
  );
}
