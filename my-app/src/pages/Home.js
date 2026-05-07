import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [stories, setStories] = useState([]);
  const { token, userBookmarks, fetchUserBookmarks } = useContext(AuthContext);

  useEffect(() => {
    API.get("/stories")
      .then((res) => setStories(res.data))
      .catch(() => console.error("Error fetching stories"));
  }, []);

  const handleBookmark = async (id) => {
    if (!token) return alert("Please login first");

    try {
      await API.post(`/stories/${id}/bookmark`);
      fetchUserBookmarks(); // UI update karne ke liye list refresh karein
    } catch (err) {
      console.error("Bookmark failed");
    }
  };

  return (
    <div className="container">
      <h2>Top Stories</h2>
      <div className="stories-grid">
        {stories.map((s) => {
          const isBookmarked = userBookmarks.includes(s._id);
          return (
            <div className="card" key={s._id}>
              <h3>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title}
                </a>
              </h3>
              <div className="card-info">
                <span>{s.points} points</span>
                <span>By {s.author}</span>
              </div>
              <button
                className={isBookmarked ? "btn-active" : "btn-normal"}
                onClick={() => handleBookmark(s._id)}
              >
                {isBookmarked ? "Saved" : "Bookmark"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
