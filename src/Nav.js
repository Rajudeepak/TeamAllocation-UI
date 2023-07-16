import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Employees">Employees</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/GroupedTeamMembers">Teams</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AddTeamMember">Add Team Member</Link>
        </li>
      </ul>
      <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Nav;
