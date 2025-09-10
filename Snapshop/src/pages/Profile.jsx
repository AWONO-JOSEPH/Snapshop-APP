import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '../components/store/store/slices/AuthSlice';
import {
  useUploadProfilePictureMutation,
  useGetOwnProfileQuery,
  useUpdateProfileMutation
} from '../components/store/store/api/Authentication';
import { useNavigate } from 'react-router-dom';
import '../PagesStyle/Profile.css';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    town: '',
    hometown: '',
    position: '',
    jobTitle: '',
    school: '',
    jobDuration: '',
    schoolDuration: ''
  });

  const [file, setFile] = useState(null);
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const { data: profileData, isSuccess, isError, error } = useGetOwnProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const token = JSON.parse(localStorage.getItem('user') || 'null')?.token?.access;

  // Auth guard: redirect if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  // If API says unauthorized, clear session and redirect
  useEffect(() => {
    if (isError && (error?.status === 401 || error?.status === 403)) {
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, [isError, error, navigate]);

  // Populate userInfo with backend data
  useEffect(() => {
    if (isSuccess && profileData) {
      setUserInfo({
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        phone: profileData.phone || '',
        town: profileData.town || '',
        hometown: profileData.hometown || '',
        position: profileData.position || '',
        jobTitle: profileData.jobTitle || '',
        school: profileData.school || '',
        jobDuration: profileData.jobDuration || '',
        schoolDuration: profileData.schoolDuration || ''
      });
    }
  }, [isSuccess, profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(userInfo).unwrap();
      dispatch(updateUser(userInfo));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPicture = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profile_picture', file);
        await uploadProfilePicture(formData).unwrap();
        alert('Profile picture uploaded successfully!');
      } catch (err) {
        console.error('Failed to upload profile picture:', err);
        alert('Failed to upload profile picture.');
      }
    } else {
      alert('Please select a file first.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
    // Force a reload to avoid cached content on back navigation
    setTimeout(() => window.location.reload(), 0);
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header-nav">
        <div className="nav-container">
          <button
            onClick={() => navigate(-1)}
            className="return-button"
          >
            <span className="return-arrow">←</span>
            Return
          </button>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="profile-container">
        {/* Profile Header Card */}
        <div className="profile-card">
          {/* Purple gradient header */}
          <div className="gradient-header"></div>

          {/* Profile info */}
          <div className="profile-info-container">
            <div className="profile-main-info">
              <div className="profile-left-section">
                {/* Profile image */}
                <div className="profile-image-wrapper">
                  {profileData?.profile_picture ? (
                    <img
                      src={profileData.profile_picture}
                      alt="Profile Avatar"
                      className="profile-image"
                    />
                  ) : (
                    <div className="profile-image placeholder" />
                  )}
                  <div className="camera-icon-wrapper">
                    <div className="camera-icon">📷</div>
                  </div>
                </div>

                <div className="profile-details">
                  <h1 className="profile-name">
                    {userInfo.first_name} {userInfo.last_name}
                  </h1>
                  <div className="profile-phone">
                    <span className="phone-icon">📞</span>
                    <span>{userInfo.phone}</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="choose-picture-btn"
                >
                  Choose Picture
                </label>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="edit-profile-btn"
                >
                  <span className="edit-icon">���️</span>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            <div className="profile-badge">
              <span className="badge">E-commerce Professional</span>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div className="save-changes-container">
            <button
              onClick={handleSaveChanges}
              className="save-changes-btn"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* About Section */}
        <div className="about-section">
          <h2 className="section-title">About</h2>

          <div className="about-grid">
            {/* Left column */}
            <div className="about-column">
              <div className="about-item">
                <div className="about-icon">💼</div>
                <div className="about-content">
                  {isEditing ? (
                    <div className="edit-fields">
                      <input
                        type="text"
                        name="jobTitle"
                        value={userInfo.jobTitle}
                        onChange={handleChange}
                        placeholder="Job Title"
                        className="edit-input"
                      />
                      <input
                        type="text"
                        name="jobDuration"
                        value={userInfo.jobDuration}
                        onChange={handleChange}
                        placeholder="Job Duration"
                        className="edit-input"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="about-title">{userInfo.jobTitle}</h3>
                      <p className="about-subtitle">{userInfo.jobDuration}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="about-item">
                <div className="about-icon">🎓</div>
                <div className="about-content">
                  {isEditing ? (
                    <div className="edit-fields">
                      <input
                        type="text"
                        name="school"
                        value={userInfo.school}
                        onChange={handleChange}
                        placeholder="School"
                        className="edit-input"
                      />
                      <input
                        type="text"
                        name="schoolDuration"
                        value={userInfo.schoolDuration}
                        onChange={handleChange}
                        placeholder="School Duration"
                        className="edit-input"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="about-title">{userInfo.school}</h3>
                      <p className="about-subtitle">{userInfo.schoolDuration}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="about-column">
              <div className="about-item">
                <div className="about-icon">📍</div>
                <div className="about-content">
                  {isEditing ? (
                    <input
                      type="text"
                      name="town"
                      value={userInfo.town}
                      onChange={handleChange}
                      placeholder="Current City"
                      className="edit-input"
                    />
                  ) : (
                    <span className="about-text">Lives in {userInfo.town}</span>
                  )}
                </div>
              </div>

              <div className="about-item">
                <div className="about-icon">🏠</div>
                <div className="about-content">
                  {isEditing ? (
                    <input
                      type="text"
                      name="hometown"
                      value={userInfo.hometown}
                      onChange={handleChange}
                      placeholder="Hometown"
                      className="edit-input"
                    />
                  ) : (
                    <span className="about-text">From {userInfo.hometown}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Settings Section */}
        <div className="location-section">
          <h2 className="section-title">Location Settings</h2>

          <div className="location-item">
            <div className="about-icon">📍</div>
            <div className="location-content">
              <h3 className="location-title">Current Position</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="position"
                  value={userInfo.position}
                  onChange={handleChange}
                  placeholder="Enter your position (coordinates or address)"
                  className="location-input"
                />
              ) : (
                <p className="location-coordinates">{userInfo.position}</p>
              )}
            </div>
          </div>
        </div>

        {/* Upload Picture Button */}
        <div className="upload-section">
          <button onClick={handleUploadPicture} className="upload-btn">
            Upload Profile Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;