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



export function sortPosts(key,posts) {
    return {
        type: SORT_POSTS,
        key: key,
        posts: posts
    };
}
export function sortAllPosts(key,posts) {
    return (dispatch) => {
      dispatch(sortPosts(key,posts))
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

export function sortComments(key,comments) {
    return {
        type: SORT_COMMENTS,
        key: key,
        comments: comments
    };
}
export function sortAllComments(key,comments) {
    return (dispatch) => {
      dispatch(sortComments(key,comments))
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
