// This is the ShowCategories component which receives the passedcategories prop.
// Depending the category passed, the child component Category is called with
// category and catflag which indicates if the given category is part of the array passedcategories
// If the passedcategories is a subset of the total categories then a Link (Home) is provided back to the root component

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import Category from './Category'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TiHomeOutline from 'react-icons/lib/ti/home-outline'
// Component App is connected to the redux store. mapStateToProps and mapDispatchToProps methods are used as both are required in the App component

class ShowCategories extends Component {
  static propTypes={
    passedcategories: PropTypes.array.isRequired
  }

  render() {
    const categories = this.props.categories
    return (

      <div className='list-categories'>
        <br/>
        <h4> Categories </h4>
        <div>
          {categories.map(category => (
            <div key={categories.indexOf(category)}><br/><Category category = {category}
            catflag = {this.props.passedcategories.indexOf(category)>-1?true:false}></Category></div>))}
        </div>
        <div>
          {categories.length!==this.props.passedcategories.length?
            <div> <br/> <h5>Home</h5> <Link className="category-link-home" to='/'><TiHomeOutline size={30}/> </Link></div>:
            <p></p>}
        </div>
      </div>
    )
  }
}

// The redux store is used to 'retrieve' all the categories in the application
function mapStateToProps ({ posts, categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(ShowCategories)
