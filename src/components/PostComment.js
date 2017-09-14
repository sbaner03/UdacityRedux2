import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../index.css'
import CommentCard from './CommentCard'
import { fetchPostComments} from '../actions'

class PostComment extends Component {
  static propTypes={
    post: PropTypes.object.isRequired
  }

  componentWillMount(){
    this.props.getPostComments(this.props.post.id)
  }


  render() {
    let localcomments = this.props.comments
    return (
      <div>
        <div>
          <br/>
          {localcomments.length===0? <h5> 'No Comments for this Post' </h5>:
          <div>
            <p> Put the comment sorter here </p>
            {localcomments.map(x=>(<CommentCard key = {x.id} comment = {x}> </CommentCard>))}
          </div>}
        </div>
      </div>
    )
  }
}


function mapStateToProps ({ comments }) {

  return {
  comments: comments}
};
const mapDispatchToProps = dispatch => ({
  getPostComments: (postid) => fetchPostComments(postid)(dispatch),

})

export default connect(mapStateToProps,mapDispatchToProps)(PostComment)
