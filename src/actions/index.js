export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const CHANGE_VOTE = 'CHANGE_VOTE'

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

export function changeVote ({ postid,voteaction}) {
  return {
    type: CHANGE_VOTE,
    postid,
    voteaction
  }
}
