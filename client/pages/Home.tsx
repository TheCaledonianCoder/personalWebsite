export function Home() {
  return (
    <section className="min-h-[calc(100vh-5rem)] w-full flex items-center justify-center text-center px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-white">
        <span className="text-xs uppercase tracking-[0.3em] text-white font-semibold mb-4 block drop-shadow-sm">
          Software Engineer
        </span>

        {/* Minimalist Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-sm mb-6 leading-tight select-none">
          <span className="block">JAMIE</span>
          <span className="block">MCFAULL</span>
        </h1>
      </div>
    </section>
  );
}

export default Home;
