import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      {/* Switch Tabs */}
      <div className="flex items-center justify-center space-x-4 mb-6 bg-white shadow-lg rounded-full px-6 py-3">
        <button
          onClick={() => setIsRegister(false)}
          className={`text-lg font-semibold px-4 py-2 rounded-full transition ${
            !isRegister ? 'bg-blue-500 text-white shadow-md' : 'text-blue-700'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsRegister(true)}
          className={`text-lg font-semibold px-4 py-2 rounded-full transition ${
            isRegister ? 'bg-blue-500 text-white shadow-md' : 'text-blue-700'
          }`}
        >
          Register
        </button>
      </div>

      {/* Form Box */}
      <div className="w-full max-w-sm p-6 bg-white rounded-3xl shadow-xl transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={isRegister ? handleRegister : handleLogin}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;

