import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './App.css';
const GroupedTeamMembers = ({ employees, selectedTeam, setTeam, teamMemberCount}) => {
  const token = localStorage.getItem('token');
  const admin = JSON.parse(localStorage.getItem('admin'));
  const [groupedEmployees, setGroupedData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
        const groupedData = groupTeamMembers(employees);
        setGroupedData(groupedData);
    };
    fetchEmployees();
    //  eslint-disable-next-line
  },[]);


  const groupTeamMembers = (employees) => {
    const groupedData = [];

    const uniqueTeams = [...new Set(employees.map((employee) => employee.teamName))];

    uniqueTeams.forEach((teamName) => {
      const teamMembers = employees.filter((employee) => employee.teamName === teamName);
      const teamData = {
        team: teamName,
        members: teamMembers,
        collapsed: selectedTeam === teamName ? false : true,
      };
      groupedData.push(teamData);
    });

    return groupedData;
  };

  const handleTeamClick = (event) => {
    const teamId = event.currentTarget.id;
    const transformedGroupData = groupedEmployees.map((groupedData) =>
      groupedData.team === teamId ? { ...groupedData, collapsed: !groupedData.collapsed } : groupedData
    );
    setGroupedData(transformedGroupData);
    setTeam(teamId);
  };

  return token && admin ? (
    <main className="container">
      {employees.length === 0 ? (
        <h3>No Employees Available Right Now!</h3>
      ) : (
        groupedEmployees.map((item) => (
          <div key={item.team} className="card mt-2" style={{ cursor: 'pointer' }}>
            <h4 id={item.team} className="card-header text-white bg-dark" onClick={handleTeamClick}>
              Team Name: {item.team}
            </h4>
            <div id={`collapse_${item.team}`} className={item.collapsed ? 'collapse' : ''}>
              <hr />
              {item.members.map((member) => (
                <div className="mt-2 text-white bg-secondary" key={member._id}>
                  <h5 className="card-title mt-2">
                    <span className="text-white">Full Name: {member.fullName}</span>
                    <br />
                    <span className="text-white">Designation: {member.designation}</span>
                    <br />
                    <span className="text-white">Email: {member.mail}</span>
                  </h5>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))
      )}
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default GroupedTeamMembers;
