// FILE: src/Components/leukoscanner/RotatingHero.jsx  (full rewrite — no rotation, no step pipeline, continuous subtle glow)
import heroImage from '../../assets/leukoscanner-hero.png';

export default function RotatingHero({ onEnterReport }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 text-center text-primary">
      <span className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        Live
      </span>

      <div className="relative z-10 mb-10 flex h-[280px] w-full items-center justify-center sm:h-[380px]">
        <img
          src={heroImage}
          alt="LeukoScanner CBC analysis visualization"
          className="glow-pulse max-h-full w-auto max-w-[80%] object-contain sm:max-w-[420px]"
          loading="eager"
        />
      </div>

      <h1 className="relative z-10 mb-2 font-serif text-4xl font-bold sm:text-5xl">LeukoScanner</h1>
      <p className="relative z-10 mb-8 text-neutral-700">CBC parameters for leukemia detection</p>

      <button
        type="button"
        onClick={onEnterReport}
        className="btn-reflect relative z-10 rounded-md bg-secondary px-8 py-3 text-sm font-semibold text-primary"
      >
        Enter CBC Report
      </button>
    </section>
  );
}