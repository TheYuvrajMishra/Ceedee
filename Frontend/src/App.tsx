import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import VenbroProducts from "./Pages/Venbro Polymer/Products";
import SKAEServices from "./Pages/Shri Krishnan/Services";

// Lazily load page components for better performance
const MainPage = lazy(() => import("./Pages/Main/MainPage"));
const Career = lazy(() => import("./Pages/Career"));
const ContactForm = lazy(() => import("./Pages/ContactForm"));
const CSR = lazy(() => import("./Pages/CSR"));
const NewsAndEvents = lazy(() => import("./Pages/News&Events"));
const Venbro = lazy(() => import("./Pages/Venbro Polymer/Venbro"));
const SKAELanding = lazy(() => import("./Pages/Shri Krishnan/ShriKrishna"));

// Layout component for public-facing pages
const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

// A simple loading/spinner component to show while pages are loading
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/csr" element={<CSR />} />
            <Route path="/news-and-events" element={<NewsAndEvents />} />
            <Route path="/venbro-polymers" element={<Venbro />} />
            <Route path="/venbro-polymers/products" element={<VenbroProducts />} />
            <Route path="/shri-krishna-automobile-enterprises" element={<SKAELanding />} />
            <Route path="/shri-krishna-automobile-enterprises/services" element={<SKAEServices />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* 404 Not Found Route */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <div className="text-center p-10">
                  <h2>404 Not Found</h2>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
