import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SchoolPage from "./pages/SchoolPage.tsx";
import NewSchoolPage from "./pages/NewSchoolPage.tsx";
import ImobiliariaPage from "./pages/ImobiliariaPage.tsx";
import AlfaCenterPage from "./pages/AlfaCenterPage.tsx";
import LevyPage from "./pages/LevyPage.tsx";
import WhatsAppRedirect from "./pages/WhatsAppRedirect.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/newschool" element={<NewSchoolPage />} />
          <Route path="/imobiliaria" element={<ImobiliariaPage />} />
          <Route path="/alfacenter" element={<AlfaCenterPage />} />
          <Route path="/levy" element={<LevyPage />} />
          <Route path="/whatsapp" element={<WhatsAppRedirect />} />
          <Route path="/whats" element={<WhatsAppRedirect />} />
          <Route path="/wpp" element={<WhatsAppRedirect />} />
          <Route path="/w" element={<WhatsAppRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
