import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaCaretDown from 'react-icons/lib/fa/caret-square-o-down';

import { connect } from 'react-redux';

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
        <div> {this.props.post.body} </div>
        <div>
          <br/>
          {localcomments.length===0? <h5> 'No Comments for this Post' </h5>:<h5> 'Comments' </h5>}
          {localcomments.map(x=>(<div key = {x.id}>{x.body}</div>))}
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
