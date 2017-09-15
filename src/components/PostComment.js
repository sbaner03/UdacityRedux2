import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import CommentCard from './CommentCard'

class PostComment extends Component {

  static propTypes={
    postcomments: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <div>
          <br/>
          {this.props.postcomments.length===0? <h5> 'No Comments for this Post' </h5>:
          <div>
            {this.props.postcomments.map(x=>(<CommentCard key = {x.id} comment = {x}> </CommentCard>))}
          </div>}
        </div>
      </div>
    )
  }
}


export default PostComment
