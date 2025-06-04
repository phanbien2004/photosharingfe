export default function Comment(props) {
    const { username, content, createAt } = props.comment;

    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>{username}:</h3>
                <h4 style={{ margin: 0, fontWeight: "normal" }}>{content}</h4>
            </div>
            <div>
                <div>Creat at : {new Date(createAt).toLocaleString()}</div>
            </div>
        </div>
    );
}
