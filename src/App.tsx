import React, { Suspense, lazy } from "react";
import type {} from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import PasswordProtectionGate from "@/components/PasswordProtectionGate";

const Index             = lazy(() => import("@/pages/Index"));
const BuilderPage       = lazy(() => import("@/pages/BuilderPage"));
const AdminPage         = lazy(() => import("@/pages/AdminPage"));
const LandingPage       = lazy(() => import("@/pages/LandingPage"));
const DesignPreviewPage = lazy(() => import("@/pages/DesignPreviewPage"));
const QuotationPage     = lazy(() => import("@/pages/QuotationPage"));

const RouteFallback = (
  <div className="min-h-screen w-full bg-[#0E0E10]" aria-hidden />
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />

      <Suspense fallback={RouteFallback}>
        <Routes>
          {/* Protected Creator Workspace Routes */}
          <Route element={<PasswordProtectionGate><Outlet /></PasswordProtectionGate>}>
            {/* Main Home Page */}
            <Route index element={<Index />} />

            {/* Landing Page Builder */}
            <Route path="/builder" element={<BuilderPage />} />

            {/* Admin Panel (protected by client-side sessionStorage check inside AdminPage) */}
            <Route path="/admin" element={<AdminPage />} />

            {/* Preview iframe route used by LandingPreviewPanel */}
            <Route path="/preview" element={<DesignPreviewPage />} />

            {/* Public quotation flow */}
            <Route path="/quotation" element={<QuotationPage />} />
          </Route>

          {/* Public landing pages served by slug */}
          <Route path="/:slug" element={<LandingPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
