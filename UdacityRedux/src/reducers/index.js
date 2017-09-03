import { combineReducers } from 'redux'

import {
  ADD_POST,
  DELETE_POST,
  CHANGE_VOTE
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
    case CHANGE_VOTE:
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


function categories (state = initialCategoryState, action) {
    return state
  }


export default combineReducers({
  posts,
  categories,
})
