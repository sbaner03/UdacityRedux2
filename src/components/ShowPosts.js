import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { fetchAllPosts } from '../actions';


class ShowPosts extends Component {
  static propTypes={
    passedcategories: PropTypes.array.isRequired,
  }
  state = {
    localposts: [],
    commentstatus: false
  }
  componentDidMount() {
    const {categories} = this.props
    this.props.fetchallPostData()
    console.log(this.props)
  }
  render() {
    let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
    this.setState({localposts: posts.filter(x=>passedcatnamearray.indexOf(x.category)>-1)})
    return (

      <div className='list-posts'>
        <h2> My Posts </h2>
        <div>
          <div>
            <div>
              {this.state.localposts.map(post => (<div key={post.id}>
                <Post post = {post} commentstatus = {this.state.commentstatus}></Post>
                </div>))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({categories }) {

  return ({
    categories: categories
  })
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchallPostData: () => dispatch(fetchAllPosts())
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(ShowPosts)
