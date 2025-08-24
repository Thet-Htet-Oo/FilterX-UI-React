import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handlePost = () => {
    const text = postText.trim();
    if (!text) return;

    const newPost = {
      id: Date.now(),
      text,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const handleCommentPost = (postId, commentText) => {
    if (!commentText.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  text: commentText,
                  replies: []
                }
              ]
            }
          : post
      )
    );
  };

  const handleReplyPost = (postId, commentId, replyText) => {
    if (!replyText.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((c) =>
                c.id === commentId
                  ? {
                      ...c,
                      replies: [
                        ...c.replies,
                        {
                          id: Date.now(),
                          text: replyText
                        }
                      ]
                    }
                  : c
              )
            }
          : post
      )
    );
  };

  return (
    <div className="hp-container">
      <div className="hp-home d-flex flex-column min-vh-100">
        {/* Navbar */}
        <nav className="hp-navbar navbar navbar-expand-lg hp-navbar-custom">
          <div className="container-fluid px-4">
            <a className="hp-navbar-brand navbar-brand" href="#">
              <i className="bi bi-mortarboard-fill"></i> Filter X
            </a>
            <button
              className="hp-navbar-toggler navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i
                className="bi bi-list"
                style={{ color: "var(--hp-gold)", fontSize: "1.25rem" }}
              ></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="hp-navbar-nav navbar-nav ms-auto align-items-lg-center">
                <li className="hp-nav-item nav-item">
                  <a className="hp-nav-link nav-link active" href="#">
                    Home
                  </a>
                </li>
                <li className="hp-nav-item nav-item">
                  <a className="hp-nav-link nav-link" href="#">
                    Courses
                  </a>
                </li>
                <li className="hp-nav-item nav-item">
                  <a className="hp-nav-link nav-link" href="#">
                    Resources
                  </a>
                </li>
                <li className="hp-nav-item nav-item">
                  <a className="hp-nav-link nav-link" href="#">
                    Profile
                  </a>
                </li>
                <li className="hp-nav-item nav-item">
                  <a className="hp-nav-link nav-link" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="hp-main container-fluid flex-grow-1 py-3 d-flex flex-column">
          <div className="hp-content-wrapper">
            <header className="hp-page-header">Filter X</header>
            <div className="hp-page-tagline">Empowering Learning & Knowledge Sharing</div>

            {/* Profile Section - Made wider */}
            <section className="hp-glass-card d-flex align-items-center mb-4">
              <img
                src="https://i.pinimg.com/736x/54/c7/c3/54c7c36c20ced3eb982c4e3e21f465fe.jpg"
                alt="Profile"
                className="hp-profile-img me-4"
              />
              <div className="flex-grow-1">
                <div className="hp-username">ThantZinWyne</div>
                <div className="hp-meta">Section A | 4th Semester</div>
              </div>
              <div className="ms-auto">
                <button className="hp-btn hp-btn-outline-custom btn">
                  Edit Profile
                </button>
              </div>
            </section>

            {/* Post Box - Made wider */}
            <section className="hp-glass-card mb-4">
              <textarea
                id="hp-postText"
                placeholder="What's on your mind?"
                rows="4"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-100"
              ></textarea>
              <div className="d-flex justify-content-end mt-3">
                <button onClick={handlePost} className="hp-btn hp-btn-glass btn">
                  <i className="bi bi-feather me-2"></i>Post
                </button>
              </div>
            </section>

            {/* Posts Container */}
            <section className="hp-posts-container">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  handleCommentPost={handleCommentPost}
                  handleReplyPost={handleReplyPost}
                />
              ))}
              
              {/* Empty state when no posts */}
              {posts.length === 0 && (
                <div className="hp-glass-card text-center py-5 d-flex flex-column justify-content-center">
                  <i className="bi bi-chat-square-text display-4 text-muted mb-3"></i>
                  <h5 className="mt-3">No posts yet</h5>
                  <p className="text-muted">Be the first to share something!</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Post({ post, handleCommentPost, handleReplyPost }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");

  return (
    <article className="hp-glass-card hp-post mb-3">
      <div className="d-flex align-items-center mb-3">
        <img
          src="https://i.pinimg.com/736x/54/c7/c3/54c7c36c20ced3eb982c4e3e21f465fe.jpg"
          alt="Profile"
          className="hp-profile-mini me-2"
        />
        <strong className="hp-username">ThantZinWyne</strong>
        <small className="text-muted ms-auto">Just now</small>
      </div>
      <p>{post.text}</p>
      <div className="d-flex gap-2 flex-wrap hp-action-buttons mb-3">
        <button className="hp-btn hp-btn-outline-success hp-btn-outline-custom btn btn-sm" title="Like">
          <i className="bi bi-hand-thumbs-up"></i> Like
        </button>
        <button
          className="hp-btn hp-btn-outline-secondary hp-btn-outline-custom btn btn-sm"
          title="Comment"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <i className="bi bi-chat-dots"></i> Comment
        </button>
        <button className="hp-btn hp-btn-outline-danger hp-btn-outline-custom btn btn-sm" title="Dislike">
          <i className="bi bi-hand-thumbs-down"></i> Dislike
        </button>
      </div>

      <section className="hp-comments">
        {showCommentBox && (
          <section className="hp-comment-box">
            <textarea
              className="form-control mb-2"
              placeholder="Write a comment..."
              rows="2"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="d-flex gap-2">
              <button
                className="hp-btn hp-btn-outline-secondary btn btn-sm"
                onClick={() => setShowCommentBox(false)}
              >
                Cancel
              </button>
              <button
                className="hp-btn hp-btn-glass btn btn-sm flex-grow-1"
                onClick={() => {
                  handleCommentPost(post.id, commentText);
                  setCommentText("");
                  setShowCommentBox(false);
                }}
              >
                <i className="bi bi-send me-1"></i>Post Comment
              </button>
            </div>
          </section>
        )}

        {post.comments.map((comment) => (
          <Comment
            key={comment.id}
            postId={post.id}
            comment={comment}
            handleReplyPost={handleReplyPost}
          />
        ))}
      </section>
    </article>
  );
}

function Comment({ postId, comment, handleReplyPost }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <article className="hp-comment mb-2">
      <div className="d-flex align-items-center">
        <img
          src="https://i.pinimg.com/736x/54/c7/c3/54c7c36c20ced3eb982c4e3e21f465fe.jpg"
          alt="Profile"
          className="hp-profile-mini me-2"
          style={{width: "30px", height: "30px"}}
        />
        <strong className="hp-username me-2">ThantZinWyne:</strong>
        <span>{comment.text}</span>
      </div>
      <div className="hp-action-buttons mt-2">
        <button
          className="hp-btn hp-btn-outline-secondary hp-btn-outline-custom btn btn-sm"
          title="Reply"
          onClick={() => setShowReplyBox(!showReplyBox)}
        >
          <i className="bi bi-reply"></i> Reply
        </button>
        <button className="hp-btn hp-btn-outline-primary hp-btn-outline-custom btn btn-sm" title="Like Comment">
          <i className="bi bi-hand-thumbs-up"></i>
        </button>
        <button className="hp-btn hp-btn-outline-danger hp-btn-outline-custom btn btn-sm" title="Dislike Comment">
          <i className="bi bi-hand-thumbs-down"></i>
        </button>
      </div>

      {showReplyBox && (
        <section className="hp-reply-box mt-2">
          <textarea
            className="form-control mb-2"
            placeholder="Write a reply..."
            rows="2"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <div className="d-flex gap-2">
            <button
              className="hp-btn hp-btn-outline-secondary btn btn-sm"
              onClick={() => setShowReplyBox(false)}
            >
              Cancel
            </button>
            <button
              className="hp-btn hp-btn-glass btn btn-sm flex-grow-1"
              onClick={() => {
                handleReplyPost(postId, comment.id, replyText);
                setReplyText("");
                setShowReplyBox(false);
              }}
            >
              <i className="bi bi-reply-fill me-1"></i>Post Reply
            </button>
          </div>
        </section>
      )}

      {comment.replies.map((reply) => (
        <article className="hp-reply mt-2" key={reply.id}>
          <div className="d-flex align-items-center">
            <img
              src="https://i.pinimg.com/736x/54/c7/c3/54c7c36c20ced3eb982c4e3e21f465fe.jpg"
              alt="Profile"
              className="hp-profile-mini me-2"
              style={{width: "30px", height: "30px"}}
            />
            <strong className="hp-username me-2">ThantZinWyne:</strong>
            <span>{reply.text}</span>
          </div>
          <div className="hp-action-buttons mt-2">
            <button className="hp-btn hp-btn-outline-primary hp-btn-outline-custom btn btn-sm" title="Like Reply">
              <i className="bi bi-hand-thumbs-up"></i>
            </button>
            <button className="hp-btn hp-btn-outline-danger hp-btn-outline-custom btn btn-sm" title="Dislike Reply">
              <i className="bi bi-hand-thumbs-down"></i>
            </button>
          </div>
        </article>
      ))}
    </article>
  );
}

export default Home;