import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';


const blogReducer = (state, action) => {
  switch (action.type) {
    
    case 'get_blogposts':
      return action.payload;

    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });

    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);

    default:
      return state;
  }
};

//func to get data from json server
const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');

    dispatch({ type: 'get_blogposts', payload: response.data });
  };
};

//adds post
const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });

    //auto returns to main page(IndexScreen) once post is create
    if (callback) {
      callback();
    }
  };
};

//delete post
const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({
      type: 'edit_blogpost',
      payload: { id, title, content }
    });
    if (callback) {
      callback();
    }
  };
};

//func that makes that makes the bellow operational methods available to all of the app
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);