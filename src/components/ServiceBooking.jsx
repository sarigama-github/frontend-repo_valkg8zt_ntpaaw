import { useEffect, useState } from 'react'

const HOME_SIZES = [
  'studio',
  '1 bed / 1 bath',
  '2 bed / 1 bath',
  '2 bed / 2 bath',
  '3 bed / 2 bath',
  '4+ bed',
]

export default function ServiceBooking() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState({ serviceId: '', dateTime: '', addressStreet: '', addressCity: '', addressState: '', addressZip: '', homeSize: HOME_SIZES[1] })
  const [estimate, setEstimate] = useState(null)
  const [message, setMessage] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/services`).then(r => r.json()).then(setServices)
  }, [])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const createBooking = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setMessage('Please log in (customer) to book')
        return
      }
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, dateTime: new Date(form.dateTime).toISOString() }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setEstimate(`Booking created! Estimated price: $${(data.estimatedPrice / 100).toFixed(2)}`)
    } catch (err) {
      setMessage(`Error: ${err.message}`)
    }
  }

  return (
    <section id="book" className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-bold text-gray-900">Book a Cleaning</h2>
        <p className="text-gray-600 mt-2">Fill in a few details and see your price estimate.</p>
        <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={createBooking}>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <select name="serviceId" value={form.serviceId} onChange={onChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select a service</option>
              {services.map(s => (<option key={s._id} value={s._id}>{s.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date & Time</label>
            <input type="datetime-local" name="dateTime" value={form.dateTime} onChange={onChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Home Size</label>
            <select name="homeSize" value={form.homeSize} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
              {HOME_SIZES.map(h => (<option key={h} value={h}>{h}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input name="addressStreet" value={form.addressStreet} onChange={onChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input name="addressCity" value={form.addressCity} onChange={onChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input name="addressState" value={form.addressState} onChange={onChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP</label>
            <input name="addressZip" value={form.addressZip} onChange={onChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <button className="rounded-md bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition" type="submit">Create Booking</button>
            {estimate && <span className="text-green-700 font-medium">{estimate}</span>}
            {message && <span className="text-red-600">{message}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
