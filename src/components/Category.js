import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Category extends Component {
  static propTypes={
    category: PropTypes.object.isRequired
  }


  render() {
    const { category} = this.props

    return (

      <div className='category'>
        <a href="#" class="btn btn-primary">{category.name}</a>
      </div>
    )
  }
}

export default Category;
