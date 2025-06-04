import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Photo from "../Photo/index";


function UserPhotos() {
  const location = useLocation();
  const firstName = location.state?.name;

  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await fetch(`http://localhost:8081/photo/get?userId=${userId}`)
      const data = await response.json();
      setPhotos(data);
    }
    fetchPhoto();
  }, [userId]);

  return (
    <div style={{
      height: 600,
      overflowY: "auto",
      marginTop: 100,
      padding: 16,
      border: "1px solid black",
      borderRadius: 8,
      marginLeft: 20,
      width: 1000
    }}>
      <h2>Ảnh của {firstName}</h2>
      <div>
        {photos.map(photo => (
          <div key={photo._id}>
            <Photo photoProps={photo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPhotos;


