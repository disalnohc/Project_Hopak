import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    history.push('/dashboard')
  })
  .catch((error) => {
    alert('บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง') // ใช้ popup แทน alert box
  });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-5 mb-3">Welcome To</h2>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
