import axios from 'axios';
const API=axios.create({baseURL:'http://localhost:5000'})
// API.interceptors.request.use((req)=>{
// if(localStorage.getItem('profile')){
//     req.headers.Authorization= `Bearer ${JSON.parser(localStorage.getItem('profile'))}`
// }
// });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});
export const fetchPosts=()=>API.get('/posts');
export const createPost=(newpost)=>API.post('/posts',newpost)
export const updatePost=(id,updatePost)=>API.post( `/posts/${id}`,updatePost)
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);
export const signIn=(formData)=>API.post('/user/signin',formData);
export const signUp=(formData)=>API.post('/user/signup',formData);