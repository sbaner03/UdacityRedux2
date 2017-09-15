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

export const addPostVote = (post_id, option) =>
  fetch(`${api}/posts/${post_id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ 'option': option })})
    .then(res=>res.json())
    .then(data=> data)
