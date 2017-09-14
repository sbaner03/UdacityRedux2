import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import Category from './Category'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TiHomeOutline from 'react-icons/lib/ti/home-outline'




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

function mapStateToProps ({ posts, categories }) {

  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(ShowCategories)
