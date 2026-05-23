import { Container } from "@/components/layout/Container";
import { AppNav } from "@/components/navigation/AppNav";
import { APP_NAME, ROUTES } from "@/config/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";

function AppHeader() {
  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container size="xl">
        <div className="flex h-14 items-center justify-between">
          <Link
            to={ROUTES.HOME}
            className="text-foreground hover:text-foreground/80 text-sm font-semibold tracking-tight transition-colors"
            aria-label={APP_NAME}
          >
            {APP_NAME.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="text-muted-foreground">AI Experience</span>
          </Link>

          <AppNav className="hidden md:flex" />
        </div>
      </Container>
    </header>
  );
}

/**
 * Shell visual principal da aplicação.
 * - Header sticky com glassmorphism
 * - AnimatePresence para transições suaves entre rotas
 * - Outlet renderiza a página ativa
 */
export function AppLayout() {
  const location = useLocation();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <AppHeader />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
