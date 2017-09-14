import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap';
import PostComment from './PostComment'
import capitalize from 'capitalize'
import { connect } from 'react-redux'
import { fetchPostComments } from '../actions'


class PostCard extends Component {
  static propTypes={
    post: PropTypes.object.isRequired
  }

  componentWillMount(){
    this.props.getPostComments(this.props.post.id)
  }

  render() {
    const post = this.props.post
    const postcomments = this.props.comments.filter(x=>(x.parentId===post.id && x.deleted===false))
    let postheader = `Post Category: ${capitalize(post.category)} Posted on: ${post.timestamp}`
    return (
      <div>
        <Panel header={postheader} bsStyle="primary">
          <p> {post.author}: {post.body}</p>
          <PostComment postcomments = {postcomments}/>
        </Panel>
      </div>
    )
    }
  }

function mapStateToProps ({comments}) {
  return ({
    comments: comments
  })
}

const mapDispatchToProps = dispatch => ({
  getPostComments: (postid) => fetchPostComments(postid)(dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(PostCard)
