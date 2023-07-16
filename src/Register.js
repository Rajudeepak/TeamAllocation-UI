import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match");
        return;
      }

    const newAdmin = {
      adminName,
      email,
      password,
      confirmPassword,
    };

    axios
      .post('https://teamallocation-api.onrender.com/register', newAdmin)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage('Registration successful');
        setErrorMessage('');
        setAdminName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage('');
        setErrorMessage('Registration failed. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Admin Name:</label>
          <input
            type="text"
            className="form-control"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
