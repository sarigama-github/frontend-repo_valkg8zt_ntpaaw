import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Book a spotless home in minutes
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Trusted local cleaners. Transparent pricing. Your card is only charged after the job is completed.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#book" className="rounded-md bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition">Book a Cleaning</a>
              <a href="/test" className="rounded-md bg-white px-5 py-3 text-blue-700 font-semibold shadow ring-1 ring-blue-200 hover:ring-blue-400 transition">Check Backend</a>
            </div>
          </div>
          <div className="relative h-[420px] sm:h-[520px] lg:h-[560px] mt-12 lg:mt-0 rounded-2xl border border-white/40 shadow-2xl backdrop-blur bg-white/30">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-50/60 via-transparent to-sky-50/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
