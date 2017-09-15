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

function posts (state=initialPostState, action) {
  let posts = [...state]
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.posts
    case ADD_POST:
      let newPost = action.newPost
      posts = [...state]
      posts.push(newPost)
      return posts
    case SORT_POSTS:
      posts = action.posts
      let sortedposts = _.cloneDeep(posts.sort(sortBy(action.key)))
      return sortedposts
    case DELETE_POST:
      let delposts = [...state].filter(x=>x.id!== action.delpost.id)
      return delposts
    case CHANGE_POST_VOTE:
      let voteposts = [...state]
      let ix = voteposts.indexOf(action.newPost)
      voteposts[ix]['voteScore'] = action.newPost.voteScore
      return voteposts
    case EDIT_POST:
      posts = [...state]
      ix = posts.indexOf(action.oldPost)
      posts[ix] = action.newPost
      return posts
    default :
      return state
  }
}

function comments (state = initialCommentState, action) {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return action.comments
    case SORT_COMMENTS:
      let sortedcomments = _.cloneDeep(action.comments.sort(sortBy(action.key)))
      return sortedcomments
    case ADD_COMMENT :
      let newComment = action.newComment
      let comments = [...state]
      comments.push(newComment)
      return comments
    case DELETE_COMMENT:
      let delcomments = [...state].filter(x=>x.id!== action.delcomment.id)
      return delcomments
    case CHANGE_COMMENT_VOTE:
      let votecomments = [...state]
      let ix = votecomments.indexOf(action.newComment)
      votecomments[ix]['voteScore'] = action.newComment.voteScore
      return votecomments
    case EDIT_COMMENT:
      comments = [...state]
      ix = comments.indexOf(action.oldComment)
      comments[ix] = action.newComment
      return comments
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
