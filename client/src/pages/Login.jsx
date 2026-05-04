import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-midnight-background px-4 py-16 md:px-6">
      <div className="mx-auto w-full max-w-md rounded-lg border border-midnight-light bg-white p-8 shadow-sm md:p-10">
        <p className="text-center font-heading text-2xl font-bold text-midnight-dark">Bloom Abaya</p>
        <p className="mt-2 text-center font-body text-sm text-midnight-dark/70">Sign in to your account</p>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="font-body text-sm font-medium text-midnight-dark">Email</span>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-md border border-midnight-light px-3 py-2.5 font-body text-sm outline-none focus:border-midnight-main"
            />
          </label>
          <label className="block">
            <span className="font-body text-sm font-medium text-midnight-dark">Password</span>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-md border border-midnight-light px-3 py-2.5 font-body text-sm outline-none focus:border-midnight-main"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-midnight-dark py-3 font-heading text-sm font-semibold text-white transition hover:bg-midnight-main"
          >
            Sign in
          </button>
        </form>
        <div className="mt-8 border-t border-midnight-light pt-6">
          <p className="text-center font-body text-sm text-midnight-dark/70">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-midnight-main hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
