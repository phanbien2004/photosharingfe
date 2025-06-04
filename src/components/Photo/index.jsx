import { useEffect, useState } from "react"
import Comment from "../Comment/index";

export default function Photo(props) {

    const [content, setContent] = useState("");
    const [photoId, setPhotoId] = useState();
    const [photoUrl, setPhotoUrl] = useState();
    const [photoDate, setPhotoDate] = useState();
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setPhotoId(props.photoProps._id);
        setPhotoUrl(props.photoProps.url);
        setPhotoDate(props.photoProps.date_time);
        setUserId(sessionStorage.getItem('userId'));
        setUsername(sessionStorage.getItem('firstName'));
    }, [])

    useEffect(() => {
        const fetchComment = async () => {
            if (!photoId) return;
            try {
                const response = await fetch(`http://localhost:8081/comment/commentOfPhoto?photoId=${photoId}`);
                const data = await response.json();
                setComments(data);
            } catch (e) {
                console.log("Loi fetchComment:", e);
            }
        }
        fetchComment()
    }, [photoId])

    const createComment = async () => {
        if (content.trim() === "") {
            alert("Ban can nhap noi dung comment!")
            return;
        }
        try {
            const response = await fetch("http://localhost:8081/comment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ photoId, userId, username, content }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Tạo comment thất bại:", data);
                alert("Không thể tạo comment: " + data?.error);
                return;
            }

            console.log("Comment tạo thành công:", data.comment);
            setContent("");
            setComments(prev => [...prev, data.comment]);
        } catch (error) {
            console.error("Lỗi khi gọi API tạo comment:", error);
            alert("Đã xảy ra lỗi khi gửi comment.");
        }
    };

    return (
        <div style={{ marginBottom: 10 }}>
            <div>
                <img src={photoUrl} alt="" style={{ width: 200 }} />
                <div>Posted date: {new Date(photoDate).toLocaleString()}</div>
            </div>
            <div>
                <h3>Comment</h3>
                <div>
                    {
                        comments.map(comment => (
                            <div key={comment._id}>
                                <Comment comment={comment} />

                            </div>
                        ))
                    }
                </div>
                <div>
                    <input
                        placeholder="Comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button onClick={createComment}>Send</button>
                </div>
            </div>
            <div style={{ marginTop: 30, marginBottom: 30 }}>
                <hr />
            </div>

        </div>
    )
}