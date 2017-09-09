import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import PostVote from './PostVote'
import PostComment from './PostComment'
import FaCaretDown from 'react-icons/lib/fa/caret-square-o-down';





class Post extends Component {
  static propTypes={
    post: PropTypes.object.isRequired,
    commentstatus: PropTypes.bool.isRequired
  }


  render() {
    const { post} = this.props
    return (
      <div className='card'>

        <div className="card-body">
          <div className = 'row'>
            <div className = "col-sm-7">
              <h4 className="card-title">{post.title}</h4>
            </div>
            <div className = "col-sm-3">
              <PostVote postid = {post.id}/>
            </div>
            <div className = "col-sm-2">
              <FaCaretDown/>
            </div>
          </div>
          <div>
              <div className="card-text">
                {this.props.commentstatus ? <PostComment postid = {post.id}> </PostComment> :post.body}
              </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Post;
