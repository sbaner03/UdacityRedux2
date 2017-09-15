import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import CommentCard from './CommentCard'
import { connect } from 'react-redux'
import shortid from 'shortid'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { sortAllComments } from '../actions'


class PostComment extends Component {

  static propTypes={
    postcomments: PropTypes.array.isRequired
  }
  sortCommentsBy=(e)=>{
    this.props.sortComments(e,this.props.comments)
  }

  render() {
    return (
      <div>
        <div>
          <br/>
          {this.props.postcomments.length===0? <h5> 'No Comments for this Post' </h5>:
          <div>
            {this.props.postcomments.map(x=>(<CommentCard key = {x.id} comment = {x}> </CommentCard>))}
            <DropdownButton bsStyle='primary' title='SortBy' id='dropdown-basic-1' onSelect = {this.sortCommentsBy}>
              <MenuItem eventKey='voteScore' key = {shortid.generate()}> Vote Score </MenuItem>
              <MenuItem eventKey='timestamp' key = {shortid.generate()}> Time Stamp </MenuItem>
            </DropdownButton>

          </div>}
        </div>
        
      </div>
    )
  }
}
function mapStateToProps ({ comments }) {

  return ({
    comments: comments,
  })
}
const mapDispatchToProps = dispatch => ({
  sortComments: (key,comments)=> sortAllComments(key,comments)(dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(PostComment)
