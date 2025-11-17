import { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' })
  const [message, setMessage] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const res = await fetch(`${baseUrl}/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'signup' ? { name: form.name, email: form.email, password: form.password, role: form.role } : { email: form.email, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Request failed')
      localStorage.setItem('token', data.token)
      setMessage('Success! You are logged in.')
    } catch (e) {
      setMessage(`Error: ${e.message}`)
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Log in / Sign up</h2>
          <div className="flex gap-2">
            <button className={`px-3 py-1 rounded ${mode==='login'?'bg-blue-600 text-white':'bg-gray-100'}`} onClick={()=>setMode('login')}>Login</button>
            <button className={`px-3 py-1 rounded ${mode==='signup'?'bg-blue-600 text-white':'bg-gray-100'}`} onClick={()=>setMode('signup')}>Sign up</button>
          </div>
        </div>
        <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={submit}>
          {mode==='signup' && (
            <>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium">Name</label>
                <input name="name" value={form.name} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select name="role" value={form.role} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300">
                  <option value="customer">Customer</option>
                  <option value="cleaner">Cleaner</option>
                </select>
              </div>
            </>
          )}
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300" required />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300" required />
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <button className="rounded-md bg-blue-600 px-5 py-2 text-white font-semibold" type="submit">{mode==='login'? 'Login' : 'Create account'}</button>
            {message && <span className="text-sm text-gray-700">{message}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
