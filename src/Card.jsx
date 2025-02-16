import React from "react";

export default function Card({ name, profilePhoto, address }) {
  return (
    <div className="card shadow p-3 mb-3">
      <img src={profilePhoto} className="card-img-top rounded-circle mx-auto d-block" alt="Profile" style={{ width: "100px" }} />
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{address}</p>
      </div>
    </div>
  );
}
