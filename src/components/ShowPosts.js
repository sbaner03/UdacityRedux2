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
    localposts: [],
    commentstatus: false
  }
  componentDidMount() {
    const { posts, categories} = this.props
    let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
    this.setState({localposts: posts.filter(x=>passedcatnamearray.indexOf(x.category)>-1)})
  }
  render() {
    return (

      <div className='list-posts'>
        <h2> My Posts </h2>
        <div>
          <div>
            <ul>
              {this.state.localposts.map(post => (<li key={post.id}>
                <Post post = {post} commentstatus = {this.state.commentstatus}></Post>
                </li>))}
            </ul>
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

const mapDispatchToProps = dispatch => ({
  getAllPosts: (action) => dispatch(getAllPosts(action))
})


export default connect(mapStateToProps,mapDispatchToProps)(ShowPosts)
