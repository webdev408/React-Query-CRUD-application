export const Posts = [
  { id: '1', title: 'React Query is awesome' },
  { id: '2', title: 'React Query is different from RTQ' },
  { id: '3', title: 'React Query is efficient' },
];

export const fetchPosts = async (query = '') => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (query) {
    return Posts.filter((post) => post.title.includes(query));
  } else {
    return Posts;
  }
};

export const addPost = async (post) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newPost = {
    id: crypto.randomUUID(),
    title: post.title,
  };
  Posts.push(newPost);

  return newPost;
};

export const updatePost = async (post) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const index = Posts.findIndex((p) => p.id === post.id);
  Posts[index] = post;
  Posts[index].title = post.title;

  return post;
};

export const deletePost = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const index = Posts.findIndex((p) => p.id === id);
  Posts.splice(index, 1);
  return { id };
};
