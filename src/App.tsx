import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

const Auth = lazy(() => import("@/pages/Auth"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Index = lazy(() => import("@/pages/Index"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const CreateLanding = lazy(() => import("@/pages/CreateLanding"));
const EditLanding = lazy(() => import("@/pages/EditLanding"));
const RecycleBin = lazy(() => import("@/pages/RecycleBin"));
const Profile = lazy(() => import("@/pages/Profile"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const DesignPreviewPage = lazy(() => import("@/pages/DesignPreviewPage"));

import SidebarLayout from "@/layouts/sidebarLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const RouteFallback = (
  <div className="min-h-screen w-full bg-[#0E0E10]" aria-hidden />
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />

      <Suspense fallback={RouteFallback}>
        <Routes>
          {/* AUTH */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* PROTECTED */}
          <Route
            element={
              <ProtectedRoute>
                <SidebarLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/create" element={<CreateLanding />} />
            <Route path="/edit/:id" element={<EditLanding />} />
            <Route path="/recycle-bin" element={<RecycleBin />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Preview iframe route — must be BEFORE /:slug */}
          <Route path="/preview" element={<DesignPreviewPage />} />

          {/* ⚠️ IMPORTANT: Static routes above, slug LAST */}
          <Route path="/:slug" element={<LandingPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
