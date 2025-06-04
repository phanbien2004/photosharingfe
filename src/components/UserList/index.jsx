import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8081/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div style={{
      marginTop: 100,
      height: 600,
      width: 300,
      marginLeft: 20,
      border: "1px solid black",
      borderRadius: 8,
      padding: 16
    }}>
      <Typography variant="body1" gutterBottom>
        Danh sách người dùng:
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem component={Link} to={`/home/user/${item._id}`}>
              <ListItemText primary={item.first_name} />
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
