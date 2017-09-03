import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'




class ShowPosts extends Component {
  static propTypes={
  passedcategories: PropTypes.object.isRequired,
  }


  render() {
    const { posts} = this.props
    posts = posts.filter(x=>(passedcategories.indexOf(x.category)>0))
    console.log('posts')

    return (

      <div className='list-posts'>
        <h1> My Posts </h1>
        <ol>
          {posts.map(post => (<ul key={post.id}>
            <Post post = {post}></Post>
            </ul>))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps ({ posts, cats }) {

  return {
    posts
  }
}

export default connect(
  mapStateToProps
)(ShowPosts)
