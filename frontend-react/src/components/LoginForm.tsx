import { useState } from "react";
import API from "../services/api";
import loginImage from '../assets/login.png';
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await API.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem('token', response.data.access_token);
      navigate("/landing");
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-80 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Login to continue</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white p-3 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

