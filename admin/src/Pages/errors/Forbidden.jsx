// FILE: src/pages/errors/Forbidden.jsx
import SEO from "../../Components/Shared/SEO";
import Button from "../../Components/Shared/Button";
import logo from "../../assets/logo.jpeg";

export default function Forbidden() {
  return (
    <>
      <SEO title="Access Denied" path="/403" noindex />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <img
          src={logo}
          alt="Research Academy Bangladesh"
          className="mb-6 h-16 w-16"
          width="64"
          height="64"
        />
        <h1 className="mb-2 text-6xl font-bold text-primary">403</h1>
        <p className="mb-6 text-neutral-700">
          You don&apos;t have permission to access this page.
        </p>
        <Button to="/">Back to Home</Button>
      </section>
    </>
  );
}
