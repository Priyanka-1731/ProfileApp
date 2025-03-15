import React from "react";

const ProfileBox = ({ profile }) => {
  return (
    <div className="card profile-box shadow-sm text-center p-3">
      <img
        src={profile.image}
        alt={profile.name}
        className="rounded-circle mx-auto mb-3"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <h5 className="mb-1">{profile.name}</h5>
      <p className="text-muted small mb-0">{profile.email}</p>
    </div>
  );
};

export default ProfileBox;
