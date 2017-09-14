import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {Button } from 'react-bootstrap';
import capitalize from 'capitalize'



class Category extends Component {
  static propTypes={
    category: PropTypes.object.isRequired
  }


  render() {
    const { category} = this.props

    return (

      <div className='category'>
        <Link className="category-link" to={`/${category.name}`}>
          <Button bsStyle="info" bsSize = "small" block> {capitalize(category.name)} </Button>
        </Link>
      </div>
    )
  }
}

export default Category;
