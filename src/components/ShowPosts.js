import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import * as PostsAPI from '../components/postsApi';


class ShowPosts extends Component {
  static propTypes={
    passedcategories: PropTypes.array.isRequired,
  }
  state = {
    localposts: []  }
  componentDidMount() {
    const {posts, categories} = this.props
    let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
    let localposts = posts.filter(x=>passedcatnamearray.indexOf(x.category)>-1)
    this.setState({localposts: localposts})
  }
  render() {
        console.log('state', this.state)
        return (

      <div className='list-posts'>
        <h2> My Posts </h2>
        <div>
          <div>
            <div>
              {this.state.localposts.map(post => (<div key={post.id}>
                <Post post = {post}></Post>
                </div>))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {

  return ({
    posts: posts,
    categories: categories
  })
}



export default connect(mapStateToProps)(ShowPosts)
