import * as PostsAPI from '../components/postsApi'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const CHANGE_COMMENT_VOTE = 'CHANGE_COMMENT_VOTE'
export const CHANGE_POST_VOTE = 'CHANGE_POST_VOTE'
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";


export function getAllPosts(){
  return (dispatch)=>{
    PostsAPI.apigetAllPosts().then(data => dispatch({type: RECEIVE_ALL_POSTS, posts: data}))
  }
}

export function addPost ({ author, body, category, title }) {
  return {
    type: ADD_POST,
    author,
    body,
    category,
    title
  }
}


export function delPost ({ postid}) {
  return {
    type: DELETE_POST,
    postid
  }
}

export function addComment ({ parentId, author, body, category, title }) {
  return {
    type: ADD_COMMENT,
    parentId,
    author,
    body,
    category,
    title
  }
}


export function delComment ({ commentid}) {
  return {
    type: DELETE_COMMENT,
    commentid
  }
}
export function changeCommentVote ({ id,voteaction}) {
  return {
    type: CHANGE_COMMENT_VOTE,
    id,
    voteaction
  }
}

export function changePostVote ({ postid,voteaction}) {
  return {
    type: CHANGE_POST_VOTE,
    postid,
    voteaction
  }
}
