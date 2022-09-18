import Post from '../Post/Post';
import './Posts.css';

const Posts = ({ posts, onDelete, setModal }) => {
  return (
    <div id='posts'>
      {posts.map(post => (
        <Post
          setModal={setModal}
          onDelete={onDelete}
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
};

export default Posts;
