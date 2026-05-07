export default function StoryCard({ story, isBookmarked, onBookmark }) {
  return (
    <div className="card">
      <h3>
        <a href={story.url} target="_blank" rel="noopener noreferrer">
          {story.title}
        </a>
      </h3>
      <div className="card-info">
        <span>{story.points} points</span>
        <span>By {story.author}</span>
        <span>{story.postedAt}</span>
      </div>
      <button
        className={isBookmarked ? "btn-active" : "btn-normal"}
        onClick={() => onBookmark(story._id)}
      >
        {isBookmarked ? "Saved" : "Bookmark"}
      </button>
    </div>
  );
}