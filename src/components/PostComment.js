import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changePostVote } from '../actions';

class PostComment extends Component {
  static propTypes={
    postid: PropTypes.string.isRequired
  }
  state = {
    localcomments: []
  }

  render() {
    const comments = this.props.comments
    let localcomments = comments.filter(x=>(x.parentId===this.props.postid))
    return (
      <ul>
        {localcomments.map(x=>(<li key = {x.id}>{x.body}</li>))}
      </ul>
    )
  }
}


function mapStateToProps ({ comments }) {

  return {
  comments: comments}
};

export default connect(mapStateToProps)(PostComment)
