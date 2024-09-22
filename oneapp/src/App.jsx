import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPost, fetchPosts, deletePost, updatePost } from './Posts';
import { useState } from 'react';

function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });
  const { mutateAsync: addPostMutation } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setTitle('');
    },
  });

  const { mutateAsync: mutationUpdate } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setTitle('');
    },
  });

  const { mutateAsync: mutationDelete } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const handleEdit = (id) => {
    const post = posts.find((p) => p.id === id);
    setTitle(post.title);
    setIsEdit(true);
    setIsEdit(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">RQ Posts</h1>
      <div className="flex justify-center my-8">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 rounded-md w-1/3 border-2" />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={async () => {
            try {
              await addPostMutation({ id: crypto.randomUUID(), title });
              // setTitle('');
              setTitle('');
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {isEdit ? 'UPDATE' : 'ADD'}
        </button>
      </div>
      <ul className="bg-gray-300 shadow-lg">
        {posts?.map((post) => (
          <li key={post.id} className="flex justify-center items-center py-4">
            <h4>{post.title}</h4>
            <button className="bg-yellow-300 p-2 mr-2 ml-4" onClick={() => handleEdit(post.id)}>
              Edit
            </button>
            <button className="bg-red-300 p-2 ml-2" onClick={() => mutationDelete({ id: post.id })}>
              Delete
            </button>
            <button className="bg-green-300 p-2 ml-2" onClick={() => mutationUpdate({ id: post.id, title })}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
