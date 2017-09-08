import { combineReducers } from 'redux'

import {
  ADD_POST,
  DELETE_POST,
  CHANGE_POST_VOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  CHANGE_COMMENT_VOTE
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
  switch (action.type) {
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
      const {postid} = action
      return state.filter(x=>x.id!==postid)
    case CHANGE_POST_VOTE:
      const {postidx, voteaction} = action
      if (voteaction==='up'){
          state[postidx]['voteScore']+=1
      } else{
        state[postidx]['voteScore']-=1
      }
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
