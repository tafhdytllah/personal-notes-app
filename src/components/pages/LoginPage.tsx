import { ROUTES } from "@/constants/route";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectUrl = ROUTES["notes"];

  useEffect(() => {
    if (!loading && user) {
      navigate(ROUTES["notes"], { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading || user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate(redirectUrl, { replace: true });
    } else {
      alert("Login gagal, coba lagi!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
