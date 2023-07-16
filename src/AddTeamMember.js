import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AddTeamMember = ({ employees, updateChangeState}) => {
  const token = localStorage.getItem('token');
  const admin = JSON.parse(localStorage.getItem('admin'));
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [mail, setMail] = useState('');
  const [gender, setGender] = useState('');
  const [teamName, setTeamName] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }

    if (!designation.trim()) {
      validationErrors.designation = 'Designation is required';
    }

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mail.trim()) {
      validationErrors.mail = 'Email is required';
    } else if (!mailRegex.test(mail)) {
      validationErrors.mail = 'Invalid email address';
    }

    if (!gender) {
      validationErrors.gender = 'Gender is required';
    }

    if (!teamName.trim()) {
      validationErrors.teamName = 'Team Name is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post(
        'https://teamallocation-api.onrender.com/employee/add',
        {
          fullName,
          designation,
          mail,
          gender,
          teamName,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFullName('');
        setDesignation('');
        setMail('');
        setGender('');
        setTeamName('');
        setErrors({});
        setSuccessMessage('Team member added successfully!');
        updateChangeState();
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrors({ server: 'An error occurred. Please try again later.' });
      });
  };

  return token && admin ?(
    <div className="container">
      <h2>Add Team Member</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errors.server && <div className="alert alert-danger">{errors.server}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation:
          </label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
          />
          {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className={`form-control ${errors.mail ? 'is-invalid' : ''}`}
          />
          {errors.mail && <div className="invalid-feedback">{errors.mail}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
          >
            <option value="">-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="teamName" className="form-label">
            Team Name:
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className={`form-control ${errors.teamName ? 'is-invalid' : ''}`}
          />
          {errors.teamName && <div className="invalid-feedback">{errors.teamName}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AddTeamMember;
