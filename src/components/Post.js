import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Post extends Component {
  static propTypes={
    post: PropTypes.object.isRequired
  }


  render() {
    const { post} = this.props

    return (

      <div className='post'>
        <p> {post.body} {post.voteScore}</p>
      </div>
    )
  }
}

export default Post;
