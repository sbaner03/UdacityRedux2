// This is the Redux action creator. There are two types of actions created in this file:
// a) Pure functions - 'pure' functions that define the objects that are dispatched the reducer. As per their definition, These
//    functions do not have any API calls. These actions within these pure functions are exported for use in the reducer
//    - sortAllPosts: creator of SORT_POSTS action
//    - getAllPosts: creator of RECEIVE_ALL_POSTS action
//    - addPost: creator of ADD_POST action
//    - editPost: creator of EDIT_POST action
//    - delPost: creator of DELETE_POST action
//    - sortAllComments: creator of SORT_COMMENTS action
//    - changePostVote: creator of CHANGE_POST_VOTE action
//    - getAllCategories: creator of RECEIVE_ALL_CATEGORIES action
//    - getPostComments: creator of RECEIVE_POST_COMMENTS action
//    - addComment: creator of ADD_COMMENT action
//    - editComment: creator of EDIT_COMMENT action
//    - delComment: creator of DELETE_COMMENT action
//    - changeCommentVote: creator of CHANGE_COMMENT_VOTE action
// b) Functions with async calls - These functions actually dispatch functions and not objects. The dispatched function in this
//    case is intercepted by the redux-middleware (thunk) where the API call is actually made. Depending on the structure of
//    these async functions (either based on resolving a promise or executed inline), once the exeternal data request is made
//    a pure function is dispatched to the reducer. These functions have API calls:
//    - fetchAllPosts: makes an API call to retrieve all posts and then dispatch getAllPosts with the posts to the reducer
//    - postPost: makes an API call to add a new post and then dispatch addPost with the new post to the reducer
//    - postPostVote: makes an API call to vote on a post and then dispatch changePostVote with a newPost (old post with the new voteScore)
//    - postCommentVote: makes an API call to vote on a comment and then dispatch changeCommentVote with a newComment (old comment with the new voteScore)
//    - postComment: makes an API call to add a new comment and then dispatch addComment with the new comment to the reducer
//    - puteditPost: makes an API call to add new data to an existing post and then dispatch editPost with the old and new posts to the reducer
//    - puteditComment: makes an API call to add new data to an existing comment and then dispatch editComment with the old and new comments to the reducer
//    - deletePost: makes an API call to delete a post and then dispatch delPost with the deleted post to the reducer
//    - deleteComment: makes an API call to delete a post and then dispatch delComment with the deleted comment to the reducer
//    - fetchAllCategories: makes an API call to retrive all the categories and then dispatch getAllCategories with the categories to the reducer
//    - fetchPostComments: makes an API call to retrive all the comments of a post and then dispatch getPostComments with the comments to the reducer
import * as PostsAPI from '../components/postsApi'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const CHANGE_COMMENT_VOTE = 'CHANGE_COMMENT_VOTE'
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS"
export const RECEIVE_ALL_CATEGORIES = "RECEIVE_ALL_CATEGORIES"
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS"
export const SORT_POSTS = "SORT_POSTS"
export const SORT_COMMENTS='SORT_COMMENTS'
export const ADD_COMMENT='ADD_COMMENT'
export const CHANGE_POST_VOTE='CHANGE_POST_VOTE'
export const EDIT_POST='EDIT_POST'
export const EDIT_COMMENT='EDIT_COMMENT'

export function sortAllPosts(key,posts) {
    return {
        type: SORT_POSTS,
        key: key,
        posts: posts
    };
}
export function getAllPosts(posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts
    };
}
export function fetchAllPosts() {
    return (dispatch) => {
        PostsAPI.apigetAllPosts()
            .then((posts) => {
                dispatch(getAllPosts(posts))})
    };
}
export function addPost (newPost) {
  return {
    type: ADD_POST,
    newPost: newPost
  }
}
export function postPost(newPost){
  return (dispatch) => {
      PostsAPI.apiaddPost(newPost)
      dispatch(addPost(newPost))
  }
}
export function changePostVote (newPost) {
  return {
    type: CHANGE_POST_VOTE,
    newPost: newPost
  }
}
export function postPostVote(post,option){
  let newPost = post
  let voteScore = post['voteScore']
  let newScore = option['option']==='upVote' ? voteScore+1 : voteScore-1
  newPost['voteScore'] = newScore
  return (dispatch) => {
      PostsAPI.addPostVote(post.id,option)
      dispatch(changePostVote(newPost))
  }
}
export function changeCommentVote (newComment) {
  return {
    type: CHANGE_COMMENT_VOTE,
    newComment: newComment
  }
}
export function postCommentVote(comment,option){
  let newComment = comment
  let voteScore = newComment['voteScore']
  let newScore = option['option']==='upVote' ? voteScore+1 : voteScore-1
  newComment['voteScore'] = newScore
  return (dispatch) => {
      PostsAPI.addCommentVote(comment.id,option)
      dispatch(changeCommentVote(newComment))
  }
}
export function addComment (newComment) {
  return {
    type: ADD_COMMENT,
    newComment: newComment
  }
}
export function postComment(newComment){
  return (dispatch) => {
      PostsAPI.apiaddComment(newComment)
      dispatch(addComment(newComment))
  }
}
export function editPost(newPost,oldPost) {
    return {
        type: EDIT_POST,
        newPost: newPost,
        oldPost: oldPost
    };
}
export function puteditPost(post,newdata) {
    let newPost = post
    newdata['title'] = newdata['title'] === null ? post['title']: newdata['title']
    newdata['body'] = newdata['body'] === null ? post['body']: newdata['body']
    newPost['title'] = newdata['title']
    newPost['body'] = newdata['body']
    return (dispatch) => {
      PostsAPI.apieditPost(post.id,newdata)
      dispatch(editPost(newPost,post))
    };
}
export function editComment(newComment,oldComment) {
    return {
        type: EDIT_COMMENT,
        newComment: newComment,
        oldComment: oldComment
    };
}
export function puteditComment(comment,newdata) {
    let newComment = comment
    newdata['body'] = newdata['body'] === null ? comment['body']: newdata['body']
    newComment['body'] = newdata['body']
    newComment['timestamp'] = newdata['timestamp']
    return (dispatch) => {
      PostsAPI.apieditComment(comment.id,newdata)
      dispatch(editComment(newComment,comment))
    };
}
export function delPost (delpost) {
  return {
    type: DELETE_POST,
    delpost: delpost
  }
}
export function deletePost(post) {
    return (dispatch) => {
      PostsAPI.apideletePost(post.id)
      dispatch(delPost(post))
    };
}

export function sortAllComments(key,comments) {
    return {
        type: SORT_COMMENTS,
        key: key,
        comments: comments
    };
}
export function delComment (comment) {
  return {
    type: DELETE_COMMENT,
    delcomment: comment
  }
}
export function deleteComment(comment){
  return (dispatch) => {
    PostsAPI.apideleteComment(comment.id)
    dispatch(delPost(comment))
  };
}
export function getAllCategories(categories) {
    return {
        type: RECEIVE_ALL_CATEGORIES,
        categories
    };
}
export function fetchAllCategories() {
    return (dispatch) => {
        PostsAPI.apigetAllCategories()
            .then((categories) => {
                dispatch(getAllCategories(categories))})
    };
}
export function getPostComments(comments) {
    return {
        type: RECEIVE_POST_COMMENTS,
        comments
    };
}
export function fetchPostComments(postid) {
    return (dispatch) => {
        PostsAPI.apigetPostComments(postid)
            .then((comments) => {
                dispatch(getPostComments(comments))})
    };
}
