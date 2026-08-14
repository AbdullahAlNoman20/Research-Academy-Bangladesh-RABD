// FILE: src/components/layout/MainLayout.jsx  (full rewrite — adds floating WhatsApp/Contact buttons)
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from "../Shared/ScrollToTop";
import ToastViewport from "../Shared/Toast";
import ErrorBoundary from "../Shared/ErrorBoundary";
import WhatsAppFloatButton from '../shared/WhatsAppFloatButton';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:bg-white focus:p-3 focus:text-primary">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ToastViewport />
      <WhatsAppFloatButton />
    </div>
  );
}