import React, { useState } from "react";
import TopBar from "../components/TopBar";

export default function UploadPhoto() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const userId = sessionStorage.getItem('userId');
    console.log("userId", userId);
    // Khi chọn file, cập nhật preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    // Gửi file lên server
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Vui lòng chọn ảnh trước khi upload");
            return;
        }

        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("user_id", userId);

        try {
            const response = await fetch("http://localhost:8081/photo/new", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setUploadStatus("Upload thành công!");
            } else {
                setUploadStatus("Upload thất bại!");
            }
        } catch (error) {
            console.error("Lỗi upload:", error);
            setUploadStatus("Lỗi khi upload");
        }
    };

    return (
        <div>
            <TopBar />
            <div style={{ padding: 20, marginTop: 50 }}>
                <h2>Upload Photo</h2>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {previewUrl && (
                    <div style={{ marginTop: 20 }}>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{ maxWidth: "300px", maxHeight: "300px", borderRadius: 8 }}
                        />
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    style={{
                        marginTop: 20,
                        padding: "10px 20px",
                        fontSize: 16,
                        cursor: "pointer",
                    }}
                >
                    Upload
                </button>

                {uploadStatus && <p>{uploadStatus}</p>}
            </div>
        </div>
    );
}
