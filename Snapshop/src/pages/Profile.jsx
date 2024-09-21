import React, { useState } from 'react';
import '../PagesStyle/Profile.css';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Joe Funcky',
    friendsCount: 39,
    phone: '6 56 40 38 35',
    jobTitle: 'Trésorier, à Eleve',
    jobDuration: 'Octobre 2020 à aujourd\'hui',
    school: 'Collège Pere Monti',
    schoolDuration: 'Est parti(e) en 2021',
    currentCity: 'Ajouter la ville actuelle',
    hometown: 'Ajouter la ville d\'origine',
    relationshipStatus: 'Ajouter une situation amoureuse',
    position: 'Position inconnue'
  });

  const [position, setPosition] = useState(userInfo.position);

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handlePositionSave = () => {
    setUserInfo({ ...userInfo, position });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Avatar"
            className="profile-avatar-large"
          />
          <div>
            <h2 className="profile-name">{userInfo.name}</h2>        
          </div>
        </div>
        <button className="add-cover-photo">Ajouter une photo de couverture</button>
      </div>

      {/* Profile Action Buttons */}
      <div className="profile-actions">
        <button className="action-button">Modifier le profil</button>
      </div>

      {/* Profile Tabs */}
      <div className="profile-tabs">
        <button className="tab-button">Publications</button>
        <button className="tab-button">À propos</button>
      </div>

      {/* About Section */}
      <div className="profile-about">
        <div className="about-heading">À propos</div>
        <div className="about-content">
          <div className="about-item">
            <i className="fas fa-briefcase"></i>
            <span>{userInfo.jobTitle}, {userInfo.jobDuration}</span>
          </div>
          <div className="about-item">
            <i className="fas fa-graduation-cap"></i>
            <span>{userInfo.school}, {userInfo.schoolDuration}</span>
          </div>
          <div className="about-item">
            <i className="fas fa-home"></i>
            <span>{userInfo.currentCity}</span>
          </div>
          <div className="about-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{userInfo.hometown}</span>
          </div>
          <div className="about-item">
            <i className="fas fa-heart"></i>
            <span>{userInfo.relationshipStatus}</span>
          </div>
          <div className="about-item">
            <i className="fas fa-phone"></i>
            <span>{userInfo.phone}</span>
          </div>
        </div>
      </div>

      {/* Set Position Section */}
      <div className="profile-position">
        <div className="position-heading">Set Your Position</div>
        <div className="position-input-group">
          <input
            type="text"
            value={position}
            onChange={handlePositionChange}
            className="position-input"
            placeholder="Enter your position (coordinates or address)"
          />
          <button className="position-save-button" onClick={handlePositionSave}>
            Save Position
          </button>
        </div>
        <div className="current-position">Current Position: {userInfo.position}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
