import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8081/userDetail?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu người dùng");
        }
        const data = await response.json();
        setUserDetail(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    if (userId) {
      fetchUserDetail();
    }
  }, [userId]);

  if (!userDetail) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{
      marginTop: 100,
      height: 600,
      overflowY: "auto",
      width: 1000,
      marginLeft: 20,
      border: "1px solid black",
      borderRadius: 8,
      padding: 16
    }}>
      <Typography variant="h5">
        {userDetail.first_name} {userDetail.last_name}
      </Typography>
      <Typography>Location: {userDetail.location}</Typography>
      <Typography>Description: {userDetail.description}</Typography>
      <Typography>Occupation: {userDetail.occupation}</Typography>
      <Link to={`/home/photos/${userId}`} state={{ name: `${userDetail.first_name}` }}>See Photo</Link>

    </div>
  );
}

export default UserDetail;
