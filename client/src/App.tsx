import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const ROUTER_BASE =
  import.meta.env.BASE_URL === "/"
    ? ""
    : import.meta.env.BASE_URL.replace(/\/$/, "");

function AnalyticsScript() {
  useEffect(() => {
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

    if (!endpoint || !websiteId || document.getElementById("umami-analytics")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "umami-analytics";
    script.defer = true;
    script.src = `${endpoint.replace(/\/$/, "")}/umami`;
    script.setAttribute("data-website-id", websiteId);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AnalyticsScript />
          <Toaster />
          <WouterRouter base={ROUTER_BASE}>
            <AppRoutes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
