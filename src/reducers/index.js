// This is the Redux action reducer. The reducer functions take actions and then return the 'reduced' state to the store
import { combineReducers } from 'redux'
import sortBy from 'sort-by'
import * as _ from "lodash"

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
  SORT_COMMENTS,
  EDIT_POST,
  EDIT_COMMENT
} from '../actions'

let initialPostState = []
let initialCategoryState = []
let initialCommentState = []

// posts - this reducer takes all the post related actions and returns the 'reduced' post
function posts (state=initialPostState, action) {
  let posts = [...state]
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.posts // return all the posts dispatched by the action
    case ADD_POST:
      let newPost = action.newPost
      posts = [...state]
      posts.push(newPost)
      return posts // return posts with the newPost added to the post array. this keeps the API database and store in sync
    case SORT_POSTS:
      posts = action.posts
      let sortedposts = _.cloneDeep(posts.sort(sortBy(action.key)))
      return sortedposts // return a sorted posts array. .cloneDeep makes sure that a sorted array and not a pointer to the orignal array is returned
    case DELETE_POST:
      let delposts = [...state].filter(x=>x.id!== action.delpost.id)
      return delposts //filter the post array and remove the deleted post. this keeps the API database and store in sync
    case CHANGE_POST_VOTE:
      let voteposts = [...state]
      let ix = voteposts.indexOf(action.newPost)
      voteposts[ix]['voteScore'] = action.newPost.voteScore
      return voteposts // return posts with ammended voteScore on the given post. this keeps the API database and store in sync
    case EDIT_POST:
      posts = [...state]
      ix = posts.indexOf(action.oldPost)
      posts[ix] = action.newPost
      return posts // return posts with ammended data on the given post. this keeps the API database and store in sync
    default :
      return state
  }
}
// comments - this reducer takes all the comments related actions and returns the 'reduced' comments
function comments (state = initialCommentState, action) {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return action.comments // return all the comments dispatched by the action
    case SORT_COMMENTS:
      let sortedcomments = _.cloneDeep(action.comments.sort(sortBy(action.key)))
      return sortedcomments // return a sorted comments array. .cloneDeep makes sure that a sorted array and not a pointer to the orignal array is returned
    case ADD_COMMENT :
      let newComment = action.newComment
      let comments = [...state]
      comments.push(newComment)
      return comments // return comments with the newPost added to the comments array. this keeps the API database and store in sync
    case DELETE_COMMENT:
      let delcomments = [...state].filter(x=>x.id!== action.delcomment.id)
      return delcomments //filter the comments array and remove the deleted post. this keeps the API database and store in sync
    case CHANGE_COMMENT_VOTE:
      let votecomments = [...state]
      let ix = votecomments.indexOf(action.newComment)
      votecomments[ix]['voteScore'] = action.newComment.voteScore
      return votecomments // return comments with ammended voteScore on the given comment. this keeps the API database and store in sync
    case EDIT_COMMENT:
      comments = [...state]
      ix = comments.indexOf(action.oldComment)
      comments[ix] = action.newComment
      return comments // return comments with ammended data on the given comment. this keeps the API database and store in sync
    default :
      return state
  }
}
// categories - this reducer takes all the categories related actions and returns the 'reduced' categories
function categories (state=initialCategoryState, action) {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
// The root reducer actually has 3 child reducers viz posts, comments, categories which are wrapped around combineReducers
export default combineReducers({
  posts,
  comments,
  categories,
})
