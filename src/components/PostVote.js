import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import { connect } from 'react-redux';
import { changePostVote } from '../actions';

class PostVote extends Component {
static propTypes={
  postid: PropTypes.string.isRequired
}


render() {
  let posts = this.state.posts
  let postVote = posts.filter(x=>(x.id===this.state.postid))
  return (
    <p> this.postVote <TiThumbsUp/> </p>

  )
  }
}

//const mapDispatchToProps = dispatch => ({
//  changePostVote: (postid,action) => dispatch(changePostVote(postid,action))
//})

function mapStateToProps ({ posts, categories }) {

  return {
  posts: posts,
  categories: categories
  }
};

export default connect(mapStateToProps)(PostVote)
