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
      <div className='card'>

        <div className="card-body">
          <h4 className="card-title">{post.author}</h4>
          <p className="card-text"> {post.body} {post.voteScore}</p>
        </div>
      </div>
    )
  }
}

export default Post;
