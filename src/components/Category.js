import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {Button } from 'react-bootstrap';
import capitalize from 'capitalize'



class Category extends Component {
  static propTypes={
    category: PropTypes.object.isRequired,
    catflag: PropTypes.bool.isRequired
  }


  render() {
    const category = this.props.category
    const catflag = this.props.catflag
    console.log(category,catflag)

    return (

      <div className='category'>
        <Link className="category-link" to={`/${category.name}`}>
          <Button bsStyle={catflag?"primary":"info"} bsSize = "small" block> {capitalize(category.name)} </Button>
        </Link>
      </div>
    )
  }
}

export default Category;
