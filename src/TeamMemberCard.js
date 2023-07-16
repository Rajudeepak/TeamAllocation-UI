import React from 'react';
import femaleProfile from './images/femaleProfile.jpg';
import maleProfile from './images/maleProfile.jpg';

const TeamMemberCard = ({ employee, handleEmployeeCardClick, handleDelete, selectedTeam }) => {
  const confirmDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this team member?')) {
      handleDelete(employee._id);
    }
  };

  return (
    <div
      key={employee._id}
      id={employee._id}
      className={
        employee.teamName === selectedTeam ? 'card m-2 standout' : 'card m-2'
      }
      style={{ cursor: 'pointer' }}
      onClick={handleEmployeeCardClick}
    >
      {employee.gender === 'male' ? (
        <img src={maleProfile} className="card-img-top" alt="maleIcon" />
      ) : (
        <img src={femaleProfile} className="card-img-top" alt="femaleIcon" />
      )}

    <div className="card-body" key={employee._id}>
        <h5 className="card-title">Full Name: {employee.fullName}</h5>
        <p className="card-text">
          <b>Designation:</b> {employee.designation}
        </p>
        <br />
        <p className="card-text">
          <b>Email:</b> {employee.mail}
        </p>
      </div>
      <button className="btn btn-danger" onClick={confirmDelete}>
        Delete
      </button>
    </div>
  );
};

export default TeamMemberCard;
