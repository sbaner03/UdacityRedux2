import React, { Component } from 'react';
import * as postsApi from './postsApi'
import '../index.css'
import { Route } from 'react-router-dom'
import ShowPosts from './ShowPosts'
import ShowCategories from './ShowCategories'
import { connect } from 'react-redux'




class App extends Component {

  render() {
    let posts = this.props.posts
    let categories = this.props.categories
    console.log(categories)
    return (

      <div className = "container-fluid">
        <div className = 'row'>
          <div className = "col-sm-3">
            <Route exact path="/" className = "showcategories" render={({history}) => (<ShowCategories categories = {posts}/>)}/>
          </div>
          <div className = "col-sm-9">
            <Route exact path="/" className = "showposts" render={({history}) => (<ShowPosts posts = {categories}/>)}/>
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
)(App)
