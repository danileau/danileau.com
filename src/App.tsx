import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/i18n/LangProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <LangProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Keep new routes above the catch-all. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </LangProvider>
);

export default App;
