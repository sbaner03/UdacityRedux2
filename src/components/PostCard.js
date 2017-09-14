import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap';
import PostComment from './PostComment'
import capitalize from 'capitalize'


class PostCard extends Component {
  static propTypes={
    post: PropTypes.object.isRequired
  }

  render() {
    const { post } = this.props
    let postheader = `Post Category: ${capitalize(post.category)} Posted on: ${post.timestamp}`
    return (
      <div>
        <Panel header={postheader} bsStyle="primary">
          <p> {post.author}: {post.body}</p>
          <PostComment post = {post} />
        </Panel>
      </div>
    )
    }
  }
export default PostCard;
