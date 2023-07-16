import TeamMemberCard from './TeamMemberCard';
import axios from 'axios';
const TeamMembers = ({ employees, handleEmployeeCardClick, selectedTeam, handleEmployeeChange }) => {
  const token = localStorage.getItem('token');
  const handleDelete = (employeeId) => {

    axios
      .delete(`https://teamallocation-api.onrender.com/employee/${employeeId}`,{headers: { Authorization: `Bearer ${token}` },})
      .then((response) => {
        console.log(response.data); 
        handleEmployeeChange('delete');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    employees.map((employee) => (
      <TeamMemberCard key={employee._id} employee={employee} handleEmployeeCardClick={handleEmployeeCardClick} selectedTeam={selectedTeam} handleDelete={handleDelete} />
    ))
  )
}
export default TeamMembers;
