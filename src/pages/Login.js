import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const response = await fetch(`http://localhost:5000/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, phone })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token AND redirect
      localStorage.setItem('token', data.token);
      console.log('Token saved:', data.token); // For debugging
      navigate('/browse', { replace: true }); // Use replace to prevent back-button loop
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="app-container" style={{ paddingTop: '50px' }}>
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '24px' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#0d9488', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}