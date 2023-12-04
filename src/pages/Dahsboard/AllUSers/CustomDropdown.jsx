
import React from 'react';
import { FaUsers, FaCogs } from 'react-icons/fa';

const CustomDropdown = ({ onMakeAdmin, onMakeVolunteer }) => {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {/* Three dots icon */}
        <FaCogs />
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {/* Dropdown items */}
        <button className="dropdown-item" onClick={onMakeAdmin}>
          <FaUsers /> Make Admin
        </button>
        <button className="dropdown-item" onClick={onMakeVolunteer}>
          <FaUsers /> Make Volunteer
        </button>
      </div>
    </div>
  );
};

export default CustomDropdown;
