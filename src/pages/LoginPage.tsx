import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

export const LoginPage: React.FC = () => {
  const { loginWithPassword, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await loginWithPassword(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950 px-4 py-8">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
        <div className="hidden w-1/2 bg-black/25 p-10 text-white lg:block">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-300">Abubakar.Arts</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight">Welcome Back</h1>
          <p className="mt-4 text-white/80">
            Login to continue. Users can explore and shop. Admin account gets secure dashboard access.
          </p>
        </div>

        <div className="flex w-full items-center justify-center bg-white p-8 dark:bg-zinc-900 lg:w-1/2">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Login</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Enter your email and password.</p>

            <form onSubmit={onPasswordLogin} className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                required
              />

              {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Please wait...' : 'Login'}
              </button>
            </form>

            <div className="my-4 flex items-center gap-3 text-zinc-400">
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
              <span className="text-xs uppercase">or</span>
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            </div>

            <button
              onClick={onGoogleLogin}
              disabled={loading}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Continue with Google
            </button>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Admin rights are auto-granted only to configured admin email (`VITE_ADMIN_EMAIL`).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
