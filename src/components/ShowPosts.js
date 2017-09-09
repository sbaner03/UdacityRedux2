import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { getAllPosts } from '../actions';





class ShowPosts extends Component {
  static propTypes={
    passedcategories: PropTypes.array.isRequired,
  }
  state = {
    localposts: this.props.posts,
    commentstatus: false
  }
  componentDidMount() {
    const { categories} = this.props
    const getAllPosts = this.props.getAllPosts
    let posts = getAllPosts()
    let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
    let localposts = posts.filter(x=>passedcatnamearray.indexOf(x.category)>-1)
    this.setState({localposts})
  }
  render() {

    return (

      <div className='list-posts'>
        <h2> My Posts </h2>
        <div>
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
const mapDispatchToProps = dispatch => ({
  getAllPosts: (action) => dispatch(getAllPosts(action))
})

export default connect(mapStateToProps,
  mapDispatchToProps)(ShowPosts)
