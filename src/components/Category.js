// This is the Category component which receives the category and the catflag (this indicates whether
// the category passed to this component is actually part of the passedcategories passed from App to ShowCategories)
// The Category component wraps a bootstrap button around a Link component which directs the application to 'page'
// for a given Category (please look up the links in App to see category specific 'pages')
// The color of the bootstrap button changes depending on catflag being true or false highlighting the
// category component being displayed

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
    // Implementation of the link to category 'page' and color change of the bootstrap button
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
