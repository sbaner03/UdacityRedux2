import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../index.css'
import CommentCard from './CommentCard'


class PostComment extends Component {
  static propTypes={
    post: PropTypes.object.isRequired
  }
  state = {
    localcomments: []
  }

  render() {
    const comments = this.props.comments
    let localcomments = comments.filter(x=>(x.parentId===this.props.post.id))
    return (
      <div>
        <div>
          <br/>
          {localcomments.length===0? <h5> 'No Comments for this Post' </h5>:
          <div>
            <p> Put the comment sorter here </p>
            {localcomments.map(x=>(<CommentCard key = {x.id} comment = {x}> </CommentCard>))}
          </div>}
        </div>
      </div>
    )
  }
}


function mapStateToProps ({ posts, comments }) {

  return {
  comments: comments}
};

export default connect(mapStateToProps)(PostComment)
