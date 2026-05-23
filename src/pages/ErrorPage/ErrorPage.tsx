import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { ROUTES } from "@/config/constants";
import { AlertCircle } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

function getErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} — ${error.statusText}`;
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred.";
}

// Usado como errorElement no createBrowserRouter — recebe o erro via useRouteError()
export function ErrorPage() {
  const error = useRouteError();
  const message = getErrorMessage(error);

  return (
    <PageWrapper title="Error">
      <Section spacing="xl">
        <Container size="md">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
              <AlertCircle className="text-destructive h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-foreground text-xl font-semibold">Something went wrong</h2>
              <p className="text-muted-foreground text-sm">{message}</p>
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
