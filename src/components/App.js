import React, { Component } from 'react';
import * as postsApi from './postsApi'
import '../index.css'
import { Route, Switch } from 'react-router-dom'
import ShowPosts from './ShowPosts'
import ShowCategories from './ShowCategories'
import { connect } from 'react-redux'
import { changeCommentVote } from '../actions'




class App extends Component {

  render() {
    let posts = this.props.posts
    let categories = this.props.categories
    let catnamearray = categories.map(x=>x.name)
    let passedcategories = {}
    console.log('catnamearray', catnamearray[0])
    return (

      <div className = "container-fluid">
        <div className = 'row'>
          <div className = "col-sm-3">
            <Route exact path="/" className = "showcategories" render={({history}) => (<ShowCategories/>)}/>
          </div>
          <div className = "col-sm-9">
            <Switch>
              <Route exact path="/" className = "showposts" render={({history}) => (<ShowPosts passedcategories = {categories}/>)}/>
              {catnamearray.map(catname=>(<Route key = {catname} exact path={`/${catname}`} render={({history}) => (<ShowPosts passedcategories = {categories.filter(x=>x.name===catname)}/>)}/>))}

            </Switch>
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
  changeCommentVote: (id,voteaction) => dispatch(changeCommentVote(id,voteaction))
});


export default connect(
  mapStateToProps,mapDispatchToProps
)(App)
