import Teams from './Teams';
import TeamMembers from './TeamMembers';
import { Navigate } from 'react-router-dom';

const Employees = ({ employees, selectedTeam, handleEmployeeCardClick, handleTeamSelectionChange, teamMemberCount, handleEmployeeChange }) => {
  const token = localStorage.getItem('token');
  const admin = JSON.parse(localStorage.getItem('admin'));
  return token && admin ?(
    <main className="container">
      {selectedTeam !== '' ? (
        <h3>
          {selectedTeam} has {teamMemberCount} {teamMemberCount === 1 ? 'member' : 'members'}
        </h3>
      ) : (
        <h3>Employees List</h3>
      )}
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-6">
          <Teams employees={employees} selectedTeam={selectedTeam}
            handleTeamSelectionChange={handleTeamSelectionChange} />
        </div>
      </div>
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-8">
          <div className="card-collection">
            <TeamMembers employees={employees}
              handleEmployeeCardClick={handleEmployeeCardClick}
              selectedTeam={selectedTeam} 
              handleEmployeeChange={handleEmployeeChange}/>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );

}
export default Employees