import { PageSkeleton } from "@/components/loading/PageSkeleton";
import { AppLayout } from "@/layouts/AppLayout";
import { RootLayout } from "@/layouts/RootLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })));

const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <HomePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
