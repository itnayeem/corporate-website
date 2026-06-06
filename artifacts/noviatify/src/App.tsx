import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContentProvider } from "@/content/ContentContext";
import { EditModeProvider } from "@/content/EditModeContext";
import { EditToolbar } from "@/components/admin/EditToolbar";
import "@/lib/adminAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/HowItWorks";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import GenericPage from "@/pages/GenericPage";
import AdminLogin from "@/pages/admin/Login";
import AdminEditor from "@/pages/admin/Editor";

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
  "/privacy",
  "/terms",
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/editor" component={AdminEditor} />
      {genericRoutes.map((path) => (
        <Route key={path} path={path}>
          {() => <GenericPage pageKey={path} />}
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <EditModeProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
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
