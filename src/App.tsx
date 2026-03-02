import React, { Suspense, lazy } from "react";
import type {} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

const Index             = lazy(() => import("@/pages/Index"));
const AdminPage         = lazy(() => import("@/pages/AdminPage"));
const LandingPage       = lazy(() => import("@/pages/LandingPage"));
const DesignPreviewPage = lazy(() => import("@/pages/DesignPreviewPage"));

const RouteFallback = (
  <div className="min-h-screen w-full bg-[#0E0E10]" aria-hidden />
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />

      <Suspense fallback={RouteFallback}>
        <Routes>
          {/* Main HTML Generator */}
          <Route index element={<Index />} />

          {/* Admin Panel (protected by client-side sessionStorage check inside AdminPage) */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Preview iframe route used by LandingPreviewPanel */}
          <Route path="/preview" element={<DesignPreviewPage />} />

          {/* Public landing pages served by slug */}
          <Route path="/:slug" element={<LandingPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
