export default function HeroSection() {
  return (
    <>
      <main className="w-full">
        <section className="relative pt-10 xl:pt-14">
          <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
            <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8 flex-1 lg:w-1/2 lg:max-w-none">
              <h1 className="text-indigo-950 dark:text-white text-4xl/snug sm:text-6xl/tight lg:text-5xl/tight xl:text-6xl/tight font-semibold">
                Let us be your finance advisor
              </h1>
              <p className="mt-4 text-gray-700 dark:text-gray-300 lg:text-3xl max-w-3xl lg:max-w-none mx-auto leading-relaxed font-bold text-xl">
                SmartMoney
              </p>
              <div className="mt-6 flex gap-4 justify-center lg:justify-start flex-wrap">
                <a href="/dashboard" className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg before:transition active:before:bg-indigo-700 text-white hover:before:bg-indigo-800 before:bg-indigo-600 hover:before:scale-105">
                  <span className="relative">
                    Get Started
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none">
              <img src="/hero_new.png" alt="happy team" width={1850} height="auto" className="lg:absolute w-full lg:inset-x-0 object-cover lg:h-full" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
