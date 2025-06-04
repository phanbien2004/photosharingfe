import React from "react";
import { Grid, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import TopBar from "../components/TopBar";
import UserList from "../components/UserList";
import UserDetail from "../components/UserDetail";
import UserPhotos from "../components/UserPhotos";

export default function Home() {
    return (
        <div className="main-container">
            <TopBar />
            <div style={{ display: "flex", gap: 50 }}>
                <UserList />
                <Routes>
                    <Route path="/user/:userId" element={<UserDetail />} />
                    <Route path="/photos/:userId" element={<UserPhotos />} />
                </Routes>
            </div>
        </div>
    );
}
