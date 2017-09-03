import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ShowPosts from './ShowPosts'


class Category extends Component {
  static propTypes={
    category: PropTypes.object.isRequired
  }


  render() {
    const { category} = this.props

    return (

      <div className='category'>
        <Link className="btn btn-primary" to={`/${category.name}`}>
          {category.name}
        </Link>
      </div>
    )
  }
}

export default Category;
