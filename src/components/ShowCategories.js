import React, { Component } from 'react';
import '../index.css'
import Category from './Category'
import { connect } from 'react-redux'



class ShowCategories extends Component {


  render() {
    const { categories} = this.props
    return (

      <div className='list-categories'>
        <br/>
        <h4> Categories </h4>
        <div>
          {categories.map(category => (
            <div key={categories.indexOf(category)}><br/><Category category = {category}></Category></div>))}
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
