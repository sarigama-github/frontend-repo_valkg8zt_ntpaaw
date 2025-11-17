import Hero from './components/Hero'
import ServiceBooking from './components/ServiceBooking'
import Auth from './components/Auth'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900">Cleanly</a>
          <nav className="flex gap-6 text-sm text-gray-700">
            <a href="#book" className="hover:text-blue-700">Book</a>
            <a href="/test" className="hover:text-blue-700">Status</a>
            <button onClick={()=>{localStorage.removeItem('token'); alert('Logged out')}} className="bg-gray-100 px-3 py-1 rounded">Logout</button>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <Auth />
        <ServiceBooking />
      </main>
      <footer className="py-12 text-center text-gray-500">© {new Date().getFullYear()} Cleanly</footer>
    </div>
  )
}

export default App
