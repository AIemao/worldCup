import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { ROUTES } from "@/config/constants";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <PageWrapper title="404 — Page not found">
      <Section spacing="xl">
        <Container size="md">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-foreground/10 text-8xl font-bold tabular-nums select-none">404</p>
            <div className="space-y-2">
              <h2 className="text-foreground text-xl font-semibold">Page not found</h2>
              <p className="text-muted-foreground text-sm">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            <Link
              to={ROUTES.HOME}
              className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            >
              Back to home
            </Link>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
