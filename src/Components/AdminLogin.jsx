{/*Emmanuel wema*/}
import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, LogIn, ShieldCheck } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { adminSessionKey, defaultAdminPassword, initialUsers, usersStorageKey } from '../auth/adminAuth.js'

function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    let savedUsers = []
    try {
      savedUsers = JSON.parse(localStorage.getItem(usersStorageKey) || '[]')
    } catch {
      savedUsers = []
    }

    const allUsers = [...initialUsers, ...savedUsers]
    const matchingAdmin = allUsers.find((user) => (
      user.role?.trim().toLowerCase() === 'admin' &&
      user.email?.trim().toLowerCase() === email.trim().toLowerCase() &&
      (user.password || defaultAdminPassword).trim() === password.trim()
    ))

    if (!matchingAdmin) {
      setError('The email or password is incorrect.')
      return
    }

    sessionStorage.setItem(adminSessionKey, 'authenticated')
    const destination = location.state?.from || '/admin'
    navigate(destination, { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071015] px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-2xl border border-[#5cd9e0]/25 bg-[#101a20] p-8 shadow-2xl shadow-black/40">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5cd9e0] text-[#102b40]">
            <ShieldCheck size={26} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5cd9e0]">Restricted area</p>
            <h1 className="mt-1 text-2xl font-bold">Administrator login</h1>
          </div>
        </div>

        <p className="mb-7 text-sm leading-6 text-[#b0d4e3]">Sign in to manage inventory, prices, users, and the storefront catalogue.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-medium text-[#d5e6ec]">
            Administrator email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@legacyauto.test"
              autoComplete="username"
              required
              className="mt-2 w-full rounded-lg border border-[#5cd9e0]/50 bg-[#080d10] px-4 py-3 font-semibold text-[#f8fafc] placeholder:text-[#8aa8b7] outline-none transition focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]"
            />
          </label>

          <label className="block text-sm font-medium text-[#d5e6ec]">
            Password
            <span className="relative mt-2 block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8aa8b7]" size={17} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-[#5cd9e0]/50 bg-[#080d10] py-3 pl-10 pr-12 font-semibold text-[#f8fafc] placeholder:text-[#8aa8b7] outline-none transition focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5cd9e0] transition hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          {error && <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5cd9e0] px-4 py-3 font-bold text-[#102b40] transition hover:bg-white">
            <LogIn size={18} />
            Sign in to admin
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-[#5cd9e0]/30 bg-[#0b252c] p-4 text-sm text-[#d5e6ec]">
          <p className="font-bold text-[#5cd9e0]">Administrator access</p>
          <p className="mt-2">Use the email saved on your Admin account.</p>
          <p className="mt-1">Existing demo Admin accounts use password: <strong className="text-white">LegacyAdmin2026!</strong></p>
        </div>

        <p className="mt-6 text-center text-xs text-[#8aa8b7]">Storefront customers do not need an account to browse parts.</p>
      </section>
    </main>
  )
}

export default AdminLogin