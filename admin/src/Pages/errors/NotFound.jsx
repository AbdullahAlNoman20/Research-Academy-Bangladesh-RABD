// FILE: src/Pages/errors/NotFound.jsx
import SEO from "../../Components/Shared/SEO";
import Button from "../../Components/Shared/Button";
import logo from "../../assets/logo.jpeg";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" noindex />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <img
          src={logo}
          alt="Research Academy Bangladesh"
          className="mb-6 h-16 w-16"
          width="64"
          height="64"
        />
        <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 text-neutral-700">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button to="/">Back to Home</Button>
      </section>
    </>
  );
}
