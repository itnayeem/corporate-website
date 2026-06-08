import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContentProvider } from "@/content/ContentContext";
import { EditModeProvider } from "@/content/EditModeContext";
import { EditToolbar } from "@/components/admin/EditToolbar";
import MaintenanceGate from "@/components/MaintenanceGate";
import CodeProtection from "@/components/CodeProtection";
import BrandHead from "@/components/BrandHead";
import TidioChat from "@/components/TidioChat";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import "@/lib/adminAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/HowItWorks";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import GenericPage from "@/pages/GenericPage";
import LegalPage from "@/pages/LegalPage";
import AdminLogin from "@/pages/admin/Login";
import AdminPages from "@/pages/admin/Pages";

const queryClient = new QueryClient();

const genericRoutes = [
  "/about/partnerships",
  "/about/blog",
  "/about/contact",
  "/services/llc",
  "/services/c-corporation",
  "/services/ltd",
  "/services/s-corporation",
  "/services/registered-agent",
  "/services/annual-report",
  "/services/foreign-qualification",
  "/services/good-standing",
  "/services/change-agent",
  "/services/name-change",
  "/order-status",
  "/research",
  "/start",
  "/login",
];

const legalRoutes = ["/privacy", "/terms"];

function Router() {
  const [location] = useLocation();

  // Admin routes render without the page transition so redirects stay instant.
  if (location.startsWith("/owner")) {
    return (
      <Switch location={location}>
        <Route path="/owner" component={AdminLogin} />
        <Route path="/owner/pages" component={AdminPages} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/services" component={Services} />
          <Route path="/about" component={About} />
          <Route path="/pricing" component={Pricing} />
          {genericRoutes.map((path) => (
            <Route key={path} path={path}>
              {() => <GenericPage pageKey={path} />}
            </Route>
          ))}
          {legalRoutes.map((path) => (
            <Route key={path} path={path}>
              {() => <LegalPage pageKey={path} />}
            </Route>
          ))}
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <CodeProtection />
        <BrandHead />
        <TidioChat />
        <Preloader />
        <ScrollProgress />
        <EditModeProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <MaintenanceGate>
                <Router />
              </MaintenanceGate>
              <EditToolbar />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </EditModeProvider>
      </ContentProvider>
    </QueryClientProvider>
  );
}

export default App;
