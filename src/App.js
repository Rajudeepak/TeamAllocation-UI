import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';
import Employees from './Employees';
import GroupedTeamMembers from './GroupedTeamMembers';
import AddTeamMember from './AddTeamMember';
import NotFound from './NotFound';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin'))|| null);
  const [selectedTeam, setTeam] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (token && admin!==null) {
      console.log(1);
      axios.get('https://teamallocation-api.onrender.com/employee/list', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token, admin]);

  const login = (authToken, authAdmin) => {
    setToken(authToken);
    setAdmin(authAdmin);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    setEmployees([])
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  };

  
  const handleEmployeeChange = () => {
    axios.get('https://teamallocation-api.onrender.com/employee/list', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  function handleTeamSelectionChange(event) {
    setTeam(event.target.value);
  }

  function handleEmployeeCardClick(event) {
    const employeeId = event.currentTarget.id;
    const employee = employees.find((emp) => emp._id === employeeId);

    let updatedTeamName;
    if (employee.teamName === selectedTeam) {
      updatedTeamName = 'Not Allocated';
    } else {
      updatedTeamName = selectedTeam;
    }

    const updatedEmployees = employees.map((emp) =>
      emp._id === employeeId ? { ...emp, teamName: updatedTeamName } : emp
    );
    setEmployees(updatedEmployees);
    axios
    .put(`https://teamallocation-api.onrender.com/employee/${employeeId}`, { teamName: updatedTeamName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <Router>
       {token && <Nav logout={logout}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/Employees"
          element={
            <Employees
              employees={employees}
              selectedTeam={selectedTeam}
              handleEmployeeCardClick={handleEmployeeCardClick}
              handleTeamSelectionChange={handleTeamSelectionChange}
              teamMemberCount={employees.filter((employee) => employee.teamName === selectedTeam).length}
              handleEmployeeChange={handleEmployeeChange}
            />
          }
        />
        <Route
          path="/GroupedTeamMembers"
          element={<GroupedTeamMembers employees={employees} selectedTeam={selectedTeam} setTeam={setTeam} updateEmployeeState={handleEmployeeChange} />}
        />
        <Route path="/AddTeamMember" element={<AddTeamMember employees={employees} updateChangeState={handleEmployeeChange} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
