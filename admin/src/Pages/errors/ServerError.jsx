// FILE: src/pages/errors/ServerError.jsx
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import logo from '../../assets/logo.jpeg';

export default function ServerError() {
  return (
    <>
      <SEO title="Something Went Wrong" path="/500" noindex />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <img src={logo} alt="Research Academy Bangladesh" className="mb-6 h-16 w-16" width="64" height="64" />
        <h1 className="mb-2 text-6xl font-bold text-primary">500</h1>
        <p className="mb-6 text-neutral-700">Something went wrong on our end. Please try again shortly.</p>
        <Button onClick={() => window.location.reload()}>Reload Page</Button>
      </section>
    </>
  );
}