import * as PostsAPI from '../components/postsApi'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const CHANGE_COMMENT_VOTE = 'CHANGE_COMMENT_VOTE'
export const CHANGE_POST_VOTE = 'CHANGE_POST_VOTE'
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS"
export const RECEIVE_ALL_CATEGORIES = "RECEIVE_ALL_CATEGORIES"
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS"


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
    newPost
  }
}

export function postPost(newPost){
  return (dispatch)=>{
    PostsAPI.apiaddPost(newPost).then((posts) =>{
      dispatch(addPost(newPost))
    })
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

export function postPostVote({postid,voteaction}) {
    return (dispatch) => {
        let apivoteaction = voteaction === 'up'?'upVote':'downVote'
        PostsAPI.addPostVote(postid,apivoteaction)
            .then((postid,voteaction) => {
                dispatch(changePostVote(postid,voteaction))})
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
