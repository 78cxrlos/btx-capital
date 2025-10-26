// src/components/AdminLogin.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import api from "../api/api";

export function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.access_token || res.data.token || res.data.accessToken;
      if (!token) {
        setError("Login failed: no token returned");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", token);
      // simple redirect to admin dashboard route
      window.location.href = "btx-capital/admin"; 
    } catch (err: any) {
      setError(err?.response?.data?.msg || err?.response?.data?.error || "Invalid credentials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 text-white p-4">
      <Card className="w-full max-w-md bg-white/5 border-amber-600/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-amber-400">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="bg-white/10 border-amber-600/30 text-white" />
            <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="bg-white/10 border-amber-600/30 text-white" />
            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
