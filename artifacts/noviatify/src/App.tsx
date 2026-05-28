import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/HowItWorks";
import Services from "@/pages/Services";
import About from "@/pages/About";
import GenericPage from "@/pages/GenericPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/about/partnerships">
        {() => <GenericPage title="Noviatify Partnerships" subtitle="Partnerships" description="Partner with Noviatify to offer world-class business formation services to your clients or community. Reach out to discuss partnership opportunities." cta={{ label: "Contact Us About Partnerships", href: "/about/contact" }} />}
      </Route>
      <Route path="/about/blog">
        {() => <GenericPage title="Noviatify Blog" subtitle="Blog" description="Stay up to date with the latest guides, tips, and news for entrepreneurs and business owners." />}
      </Route>
      <Route path="/about/contact">
        {() => <GenericPage title="Contact Noviatify" subtitle="Get in Touch" description="Have a question? Our team of business formation experts is ready to help. Reach out and we'll respond within one business day." cta={{ label: "Start a Formation Now", href: "/start" }} />}
      </Route>
      <Route path="/services/llc">
        {() => <GenericPage title="Form an LLC" subtitle="Limited Liability Company" description="Start your LLC today. Noviatify handles state filing, registered agent, and all paperwork — fast, free, and stress-free." cta={{ label: "Form Your LLC Now", href: "/start" }} />}
      </Route>
      <Route path="/services/c-corporation">
        {() => <GenericPage title="Form a C Corporation" subtitle="C Corporation" description="The ideal structure for startups seeking venture capital. Noviatify files your C Corp in days." cta={{ label: "Form Your C Corp Now", href: "/start" }} />}
      </Route>
      <Route path="/services/ltd">
        {() => <GenericPage title="Form an LTD" subtitle="Limited Company" description="A globally recognized structure for international entrepreneurs. Noviatify makes cross-border business easy." cta={{ label: "Form Your LTD Now", href: "/start" }} />}
      </Route>
      <Route path="/services/s-corporation">
        {() => <GenericPage title="File for an S Corporation" subtitle="S Corp Election" description="Elect S Corp status with the IRS and optimize your tax structure. Noviatify prepares and files IRS Form 2553 for you." cta={{ label: "File for S Corp", href: "/start" }} />}
      </Route>
      <Route path="/services/registered-agent">
        {() => <GenericPage title="Get a Registered Agent" subtitle="Registered Agent Service" description="A professional registered agent keeps your business compliant and your personal address private. Available in all 50 states." cta={{ label: "Get a Registered Agent", href: "/start" }} />}
      </Route>
      <Route path="/services/annual-report">
        {() => <GenericPage title="Submit an Annual Report" subtitle="Annual Report Filing" description="Never miss a deadline. Noviatify tracks your filing dates and submits annual reports with the state on your behalf." cta={{ label: "File Your Annual Report", href: "/start" }} />}
      </Route>
      <Route path="/services/foreign-qualification">
        {() => <GenericPage title="Foreign Qualification" subtitle="Expand to New States" description="Register your existing company to operate legally in a new state. Noviatify handles all paperwork for foreign qualification." cta={{ label: "Get Foreign Qualified", href: "/start" }} />}
      </Route>
      <Route path="/services/good-standing">
        {() => <GenericPage title="Certificate of Good Standing" subtitle="Good Standing Certificate" description="Obtain official proof that your business is active and compliant — required for loans, leases, and bank accounts." cta={{ label: "Get Your Certificate", href: "/start" }} />}
      </Route>
      <Route path="/services/change-agent">
        {() => <GenericPage title="Change Your Registered Agent" subtitle="Agent Change Filing" description="Switch your registered agent quickly and keep your state records up to date. Noviatify handles all transition paperwork." cta={{ label: "Change Your Agent", href: "/start" }} />}
      </Route>
      <Route path="/services/name-change">
        {() => <GenericPage title="Company Name Change" subtitle="Business Name Amendment" description="Rebranding your company? Noviatify files the state amendment to legally update your business name." cta={{ label: "Change Your Company Name", href: "/start" }} />}
      </Route>
      <Route path="/pricing">
        {() => <GenericPage title="Pricing" subtitle="Transparent & Simple" description="Noviatify is built on transparency. No hidden fees — all state filing costs are clearly disclosed before you complete your application. Business formation starts at $0 + state fees." cta={{ label: "Start Now — It's Free", href: "/start" }} />}
      </Route>
      <Route path="/order-status">
        {() => <GenericPage title="Check Order Status" subtitle="Order Tracking" description="Track the status of your business formation or compliance filing. Log in to your Noviatify dashboard to see real-time updates." cta={{ label: "Log In to Dashboard", href: "/login" }} />}
      </Route>
      <Route path="/research">
        {() => <GenericPage title="Business Research Tool" subtitle="Research Tool" description="Use our state-by-state business name search and formation guide to research your options before filing." cta={{ label: "Start Your Research", href: "/start" }} />}
      </Route>
      <Route path="/start">
        {() => <GenericPage title="Start Your Business" subtitle="Get Started" description="You're one step away from having a registered company. Complete your formation in minutes." cta={{ label: "Begin My Application", href: "/" }} />}
      </Route>
      <Route path="/login">
        {() => <GenericPage title="Log In to Noviatify" subtitle="Account Access" description="Access your Noviatify dashboard to track filings, manage compliance, and update your business information." cta={{ label: "Back to Home", href: "/" }} />}
      </Route>
      <Route path="/privacy">
        {() => <GenericPage title="Privacy Policy" subtitle="Your Privacy" description="Noviatify is committed to protecting your personal information. We never sell your data and comply with all applicable privacy laws." />}
      </Route>
      <Route path="/terms">
        {() => <GenericPage title="Terms of Service" subtitle="Terms & Conditions" description="By using Noviatify, you agree to our terms of service. These terms govern your use of our platform and services." />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
