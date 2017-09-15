const api = "http://localhost:5001"
const token = 'anything'
const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const apigetAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const apigetAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPost = (post_id) =>
  fetch(`${api}/posts/${post_id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const apigetPostComments = (post_id) =>
  fetch(`${api}/posts/${post_id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const apiaddPost = (data) =>
fetch(`${api}/posts/`, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)}).then(res=>res)

export const apiaddComment = (data) =>
  fetch(`${api}/comments/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)}).then(res=>res)


export const addPostVote = (post_id, option) =>
  fetch(`${api}/posts/${post_id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(option)}).then(res=>res)

export const addCommentVote = (comment_id, option) =>
  fetch(`${api}/comments/${comment_id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(option)}).then(res=>res)

export const apieditComment = (comment_id,data) =>
  fetch(`${api}/comments/${comment_id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)}).then(res=>res)

export const apieditPost = (post_id, data) =>
  fetch(`${api}/posts/${post_id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)}).then(res=>res)

export const apideletePost = (post_id) =>
  fetch(`${api}/posts/${post_id}`, {
    method: 'DELETE',
    headers: headers}).then(res=>res)

export const apideleteComment = (comments_id) =>
  fetch(`${api}/comments/${comments_id}`, {
    method: 'DELETE',
    headers: headers}).then(res=>res)
