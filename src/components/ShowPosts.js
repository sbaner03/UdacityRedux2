import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import sortBy from 'sort-by'





class ShowPosts extends Component {
  static propTypes={
    passedcategories: PropTypes.array.isRequired,
  }
  state = {
    localposts: this.props.posts,
    commentstatus: false
  }
  componentDidMount() {
    const { posts, categories} = this.props
    let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
    let localposts = posts.filter(x=>passedcatnamearray.indexOf(x.category)>-1)
    this.setState({localposts})
    console.log('ShowPosts', passedcatnamearray, localposts)
  }
  render() {

    return (

      <div className='list-posts'>
        <h1> My Posts </h1>
        <div>
          <div>
            <p> Show Controls </p>
          </div>
          <div>
            <ol>
              {this.state.localposts.map(post => (<ul key={post.id}>
                <Post post = {post}></Post>
                </ul>))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {

  return {
  posts: posts,
  categories: categories
  }
}

export default connect(
  mapStateToProps
)(ShowPosts)
