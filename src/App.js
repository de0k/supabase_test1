import { useEffect, useState } from "react";
import { fetchPosts, addPost, updatePost, deletePost } from "./services/postService";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPost, setEditingPost] = useState(null); // 현재 편집 중인 게시물

  // 초기 데이터 로드
  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  // 새 게시글 추가
  const handleAddPost = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    const newPost = await addPost(title, content);
    if (newPost) {
      setPosts([...posts, ...newPost]);
      setTitle("");
      setContent("");
    }
  };

  // 게시글 수정 시작
  const handleEditPost = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  // 게시글 수정 완료
  const handleUpdatePost = async () => {
    if (!editingPost) return;

    const updatedPost = await updatePost(editingPost.id, title, content);
    if (updatedPost) {
      setPosts(posts.map((post) => (post.id === editingPost.id ? updatedPost[0] : post)));
      setEditingPost(null);
      setTitle("");
      setContent("");
    }
  };

  // 게시글 삭제
  const handleDeletePost = async (id) => {
    const isDeleted = await deletePost(id);
    if (isDeleted) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div>
      <h1>Posts</h1>

      {/* 게시글 목록 */}
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => handleEditPost(post)}>Edit</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {/* 게시글 추가/수정 폼 */}
      <div>
        <h2>{editingPost ? "Edit Post" : "Add a Post"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {editingPost ? (
          <button onClick={handleUpdatePost}>Update Post</button>
        ) : (
          <button onClick={handleAddPost}>Add Post</button>
        )}
      </div>
    </div>
  );
}

export default App;
