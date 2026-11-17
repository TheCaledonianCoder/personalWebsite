export function Home() {
  return (
    <div>
      {/* Full-width Hero Banner matching Navbar Background (#F4F5F0) */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[350px] sm:h-[400px] flex items-center justify-center text-center px-4 sm:px-6 -mt-6 sm:-mt-10 mb-12 bg-[#F4F5F0]">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C85A17] font-normal mb-4 block">
            Software Engineer
          </span>

          {/* Minimalist Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-slate-900 drop-shadow-sm mb-6 break-words select-none">
            JAMIE MCFAULL
          </h1>

          {/* Red Accent Underline */}
          <div className="w-24 h-1 bg-[#C85A17] rounded-full" />
        </div>
      </section>
    </div>
  );
}

export default Home;
