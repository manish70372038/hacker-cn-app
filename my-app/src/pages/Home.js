import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import StoryCard from "../components/StoryCard";

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
      fetchUserBookmarks();
    } catch (err) {
      console.error("Bookmark failed");
    }
  };

  return (
    <div className="container">
      <h2>Top Stories</h2>
      <div className="stories-grid">
        {stories.map((s) => (
          <StoryCard
            key={s._id}
            story={s}
            isBookmarked={userBookmarks.includes(s._id)}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </div>
  );
}