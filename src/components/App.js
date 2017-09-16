// This is the main App component which is built using react-bootstrap. The 'grid' has two sections:
// a) Categories - this displays the categories of the posts
// b) Posts - this displays the posts either for all categories (root) or for a selected category

import React, { Component } from 'react';
import '../index.css'
import { Route, Switch, withRouter } from 'react-router-dom';
// withRouter is used to make sure that the page re-renders and the application's history / route/ path changes
// the internal structure of connect in react-redux leads to the components being out of sync with the history of the route component
import ShowPosts from './ShowPosts'
// ShowPosts is responsible for the display and manipulation of posts and their associated comments
import ShowCategories from './ShowCategories'
// ShowCategories is responsible for the display of categories
import { connect } from 'react-redux'
import { fetchAllCategories} from '../actions';
// fetchAllCategories is an action creator that makes an async call to initialize the store with all the required categories

class App extends Component {

// the constructor can be used to run getAllCategories (this is assigned to the fetchAllCategories method as a prop)
//  constructor(props) {
//     super(props)
//     props.getAllCategories()
//  }

  componentWillMount(){
    this.props.getAllCategories()
    // have used componentWillMount to initialize the store with categories
  }

  render() {
    let categories = this.props.categories
    let catnamearray = categories.map(x=>x.name)
    // convert an array of category objects into an array of category names
    let newPost = {
        'author':null,
        'title':null,
        'body':null,
        'category':null
      }
    // this is an empty newPost object. This is used as a prop in ShowPosts for adding and editing existing Posts
    // the Route is dynamically generated for each category name and the categories array is passed to ShowCategories component to further render the categories in that view
    // the Route is dynamically generated for each category name and the categories array is passed to ShowCategories component to further render the categories in that view

    return (

      <div className = "container-fluid">
        <div className = 'row'>
          <div className = "col-sm-1">
            <Switch>
              <Route exact path="/" className = "showcategories" render={({history}) => (<ShowCategories passedcategories = {categories}/>)}/>
              {catnamearray.map(catname=>(<Route key = {catname} exact path={`/${catname}`} render={({history}) => (<ShowCategories passedcategories = {categories.filter(x=>x.name===catname)}/>)}/>))}
            </Switch>
          </div>
          <div className = "col-sm-11">
            <Switch>
              <Route exact path="/" className = "showposts" render={({history}) => (<ShowPosts passedcategories = {categories} newPost={newPost}/>)}/>
              {catnamearray.map(catname=>(<Route key = {catname} exact path={`/${catname}`} render={({history}) => (<ShowPosts passedcategories = {categories.filter(x=>x.name===catname)} newPost={newPost}/>)}/>))}

            </Switch>
          </div>

        </div>
      </div>
    )
  }
}

// mapping redux categories state to local properties propoerties.
function mapStateToProps ({ categories }) {
  return {
    categories: categories

  }
}
// mapping redux dispatch to local prop method called getAllCategories to the action creator fetchAllCategories to get categories initialized
// in the redux store. The local prop method initializes categories in the redux store which in turn in accessed through the local props
const mapDispatchToProps = dispatch => ({
  getAllCategories: () => fetchAllCategories()(dispatch),
})


// Component App is connected to the redux store. mapStateToProps and mapDispatchToProps methods are used as both are required in the App component
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
