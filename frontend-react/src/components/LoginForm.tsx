import { useState } from "react";
import API from "../services/api";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await API.post(
        '/auth/login',
        { email, password },
        { withCredentials: true } // <--- important
      );
      
      localStorage.setItem('token', response.data.access_token);
      window.location.href = '/';
      
    } catch (error) {
      console.error('Login failed:', error);
      // optional: show an error message to user
    }
  };
  

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full bg-blue-800 text-white p-2 rounded">Login</button>
    </form>
  );
}
