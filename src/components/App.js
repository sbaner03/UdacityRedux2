import React, { Component } from 'react';
import * as postsApi from './postsApi'
import '../index.css'
import { Route } from 'react-router-dom'
import ShowPosts from './ShowPosts'
import ShowCategories from './ShowCategories'



class App extends Component {
  state = {
    posts:[],
    categories: []
  }

  componentDidMount() {
    postsApi.getAllPosts().then((posts) => {
      this.setState({ posts })
    })
    postsApi.getAllCategories().then((categories) => {
      this.setState({ categories })
    })
  }


  render() {
    return (

      <div className = "container-fluid">
        <div className = 'row'>
          <div className = "col-sm-3">
            <Route exact path="/" className = "showcategories" render={({history}) => (<ShowCategories categories = {this.state.categories}/>)}/>
          </div>
          <div className = "col-sm-9">
            <Route exact path="/" className = "showposts" render={({history}) => (<ShowPosts posts = {this.state.posts}/>)}/>
          </div>

        </div>
      </div>
    )
  }
}

export default App;
