import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {PostVote} from './PostVote'




class Post extends Component {
  static propTypes={
    post: PropTypes.object.isRequired
  }


  render() {
    const { post} = this.props

    return (
      <div className='card'>

        <div className="card-body">
          <h4 className="card-title">{post.author} <PostVote postdata = {post.id} > </PostVote></h4>
          <p className="card-text"> {post.body}</p>

        </div>
      </div>
    )
  }
}


export default Post;
