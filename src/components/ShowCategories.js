import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Category from './Category'
import { connect } from 'react-redux'



class ShowCategories extends Component {


  render() {
    const { categories} = this.props
    return (

      <div className='list-categories'>
        <h4> My Categories </h4>
        <ol>
          {categories.map(category => (<ul key={categories.indexOf(category)}>
            <Category category = {category}></Category>
            </ul>))}
        </ol>
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
