import React, { useState, useEffect } from 'react';
import './App.css';

const Teams = ({ employees, selectedTeam, handleTeamSelectionChange }) => {
  const [teamNames, setTeamNames] = useState([]);
  const [length, setLength] = useState(0);
  useEffect(() => {
    const fetchEmployees = async () => {
      const names = getUniqueTeamNames(employees);
      setTeamNames(names);
    };
    fetchEmployees();
  }, [employees]);

  const getUniqueTeamNames = (employees) => {
    const uniqueNames = [...new Set(employees.map((employee) => employee.teamName))];
    setLength(uniqueNames.length);
    return uniqueNames;
  };

  return length!==0?(
    <select className="form-select form-select-lg" value={selectedTeam} onChange={handleTeamSelectionChange}>
      <option value="">Select a team</option>
      {teamNames.map((teamName) => (
        <option key={teamName} value={teamName}>
          {teamName}
        </option>
      ))}
    </select>
  ) : (
    <h3>No Employees Available Right Now!</h3>
  );
};

export default Teams;
