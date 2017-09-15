import { combineReducers } from 'redux'
import {
  ADD_POST,
  DELETE_POST,
  CHANGE_POST_VOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  CHANGE_COMMENT_VOTE,
  RECEIVE_ALL_POSTS,
  RECEIVE_ALL_CATEGORIES,
  RECEIVE_POST_COMMENTS,
  SORT_POSTS,
  SORT_COMMENTS
} from '../actions'

let initialPostState = []
let initialCategoryState = []
let initialCommentState = []

function posts (state=initialPostState, action) {
  let postid = ''
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.posts
    case ADD_POST:
      let newPost = action.newPost
      let posts = [...state]
      posts.push(newPost)
      return posts
    case SORT_POSTS:
      return action.posts
    case DELETE_POST:
      postid = action.postid
      state[postid]['deleted'] = true
      return [...state]

    case CHANGE_POST_VOTE:
      postid = action.postid
      let voteaction =action.voteaction
      let targetpost = state.filter(x=>x.id===postid)
      let idx = state.indexOf(targetpost[0])
      let voteScore = targetpost[0].voteScore
      if (voteaction==='up'){
          voteScore+=1
      } else{
        voteScore-=1
      }
      state[idx]['voteScore'] = voteScore
      return [...state]
    default :
      return state
  }
}

function comments (state = initialCommentState, action) {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return action.comments
    case SORT_COMMENTS:
      return action.comments

    case ADD_COMMENT :
      const { parentId, author, body, category, title } = action
      let newObj = {}
      newObj['parentId'] = parentId
      newObj['author'] = author
      newObj['body'] = body
      newObj['category'] = category
      newObj['title'] = title
      newObj['id'] = 'testingID'
      newObj['timestamp'] = 'testingtimeStamp'
      return {
        ...state,newObj,
      }
    case DELETE_COMMENT:
      const commentid = action.commentid
      state[commentid]['deleted'] = true
      return [...state]

    case CHANGE_COMMENT_VOTE:
      const {commentidx, voteaction} = action
      if (voteaction==='up'){
          state[commentidx]['voteScore']+=1
      } else{
        state[commentidx]['voteScore']-=1
      }
      return state

    default :
      return state
  }
}

function categories (state=initialCategoryState, action) {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES:
      return action.categories
    default:
      return state
  }
}


export default combineReducers({
  posts,
  comments,
  categories,
})
