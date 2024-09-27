import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '../components/store/store/slices/AuthSlice';
import { useUploadProfilePictureMutation, useGetProfileQuery, useUpdateProfileMutation } from '../components/store/store/api/Authentication';
import '../PagesStyle/Profile.css';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.first_name || 'Joe Funcky',
    phone: user?.phone || '6 56 40 38 35',
    currentCity: user?.town || 'Ajouter la ville actuelle',
    hometown: user?.hometown || 'Ajouter la ville d\'origine',
    position: user?.position || 'Position inconnue'
  });

  const [file, setFile] = useState(null);
  const [uploadProfilePicture] = useUploadProfilePictureMutation(); 
  const { data: profileData, isSuccess } = useGetProfileQuery(); // Fetch user profile
  const [updateProfile] = useUpdateProfileMutation();

  // Update local user state with fetched profile data
  useEffect(() => {
    if (isSuccess && profileData) {
      setUserInfo({
        name: profileData.first_name || 'Joe Funcky',
        phone: profileData.phone || '6 56 40 38 35',
        currentCity: profileData.town || 'Ajouter la ville actuelle',
        hometown: profileData.hometown || 'Ajouter la ville d\'origine',
        position: profileData.position || 'Position inconnue'
      });
    }
  }, [isSuccess, profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(userInfo); // Update profile via API
      dispatch(updateUser(userInfo)); // Update Redux state
      setIsEditing(false); 
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  const handleUploadPicture = async () => {
    if (file) {
      try {
        await uploadProfilePicture({ file }).unwrap();
        alert("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload profile picture:", error);
        alert("Failed to upload profile picture.");
      }
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src={profileData?.profile_picture || "https://via.placeholder.com/150"}
            alt="Profile Avatar"
            className="profile-avatar-large"
          />
          <div>
            <h2 className="profile-name">{userInfo.name}</h2>
          </div>
        </div>
        <button className="add-cover-photo" onClick={handleUploadPicture}>
          Add a Profile Picture
        </button>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          id="file-upload" 
        />
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose File
        </label>
      </div>

      {/* Profile Action Buttons */}
      <div className="profile-actions">
        <button className="action-button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Modifier le profil"}
        </button>
        {isEditing && (
          <button className="action-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        )}
      </div>

      {/* About Section */}
      <div className="profile-about">
        <div className="about-heading">À propos</div>
        <div className="about-content">
          {isEditing ? (
            <>
              <input 
                type="text" 
                name="jobTitle" 
                value={userInfo.jobTitle} 
                onChange={handleChange} 
                placeholder="Job Title"
              />
              <input 
                type="text" 
                name="school" 
                value={userInfo.school} 
                onChange={handleChange} 
                placeholder="School"
              />
            </>
          ) : (
            <>
              <div className="about-item">
                <i className="fas fa-briefcase"></i>
                <span>{userInfo.jobTitle || "Job Title"}, {userInfo.jobDuration || "Duration"}</span>
              </div>
              <div className="about-item">
                <i className="fas fa-graduation-cap"></i>
                <span>{userInfo.school || "School"}, {userInfo.schoolDuration || "Duration"}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Set Position Section */}
      <div className="profile-position">
        <div className="position-heading">Set Your Position</div>
        {isEditing ? (
          <>
            <input
              type="text"
              name="position"
              value={userInfo.position}
              onChange={handleChange}
              placeholder="Enter your position (coordinates or address)"
            />
          </>
        ) : (
          <div className="current-position">Current Position: {userInfo.position}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
