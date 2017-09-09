import { combineReducers } from 'redux'

import {
  ADD_POST,
  DELETE_POST,
  CHANGE_POST_VOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  CHANGE_COMMENT_VOTE,
  RECEIVE_ALL_POSTS
} from '../actions'

const initialPostState = [{'author': 'thingtwo',
  'body': 'Everyone says so after all.',
  'category': 'react',
  'deleted': false,
  'id': '8xf0y6ziyjabvozdd253nd',
  'timestamp': 1467166872634,
  'title': 'Udacity is the best place to learn React',
  'voteScore': 6},
 {'author': 'thingone',
  'body': 'Just kidding. It takes more than 10 minutes to learn technology.',
  'category': 'redux',
  'deleted': false,
  'id': '6ni6ok3ym7mf1p33lnez',
  'timestamp': 1468479767190,
  'title': 'Learn Redux in 10 minutes!',
  'voteScore': -5}]

const initialCategoryState = [{'name': 'react', 'path': 'react'},
 {'name': 'redux', 'path': 'redux'},
 {'name': 'udacity', 'path': 'udacity'}]

const initialCommentState = [{'author': 'thingtwo',
  'body': 'Hi there! I am a COMMENT.',
  'deleted': false,
  'id': '894tuq4ut84ut8v4t8wun89g',
  'parentDeleted': false,
  'parentId': '8xf0y6ziyjabvozdd253nd',
  'timestamp': 1468166872634,
  'voteScore': 6},
 {'author': 'thingone',
  'body': 'Comments. Are. Cool.',
  'deleted': false,
  'id': '8tu4bsun805n8un48ve89',
  'parentDeleted': false,
  'parentId': '8xf0y6ziyjabvozdd253nd',
  'timestamp': 1469479767190,
  'voteScore': -5}]

function posts (state = initialPostState, action) {
  let postid = ''
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.posts
    case ADD_POST :
      const { author,body,category,title } = action
      let newObj = {}
      newObj['author'] = author
      newObj['body'] = body
      newObj['category'] = category
      newObj['title'] = title
      newObj['id'] = 'testingID'
      newObj['timestamp'] = 'testingtimeStamp'
      return {
        ...state,newObj,
      }
    case DELETE_POST:
      postid = action.postid
      return state.filter(x=>x.id!==postid)
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
      return state

    default :
      return state
  }
}

function comments (state = initialCommentState, action) {
  switch (action.type) {
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
      const {commentid} = action
      return state.filter(x=>x.id!==commentid)
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

function categories (state = initialCategoryState, action) {
    return state
  }


export default combineReducers({
  posts,
  comments,
  categories,
})
