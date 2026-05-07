import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Bookmarks() {
  const [stories, setStories] = useState([]);
  const { fetchUserBookmarks } = useContext(AuthContext);

  const getMyBookmarks = () => {
    API.get("/stories/bookmarks")
      .then((res) => setStories(res.data))
      .catch(() => console.error("Error fetching bookmarks"));
  };

  useEffect(() => {
    getMyBookmarks();
  }, []);

  const removeBookmark = async (id) => {
    try {
      await API.post(`/stories/${id}/bookmark`);
      fetchUserBookmarks(); // Global state update
      getMyBookmarks(); // Local page update
    } catch (err) {
      console.error("Error removing bookmark");
    }
  };

  return (
    <div className="container">
      <h2>My Bookmarks</h2>
      {stories.length === 0 ? (
        <div className="empty-state">
          <p>You haven't saved any stories yet.</p>
        </div>
      ) : (
        stories.map((s) => (
          <div className="card" key={s._id}>
            <h3>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#2c3e50" }}
              >
                {s.title}
              </a>
            </h3>
            <p>
              {s.points} points | By {s.author}
            </p>
            <button
              className="btn-remove"
              onClick={() => removeBookmark(s._id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
