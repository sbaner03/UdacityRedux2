import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PostVote from './PostVote'
import FaCaretDown from 'react-icons/lib/fa/caret-square-o-down';
import '../index.css'
import PostCard from './PostCard'

class Post extends Component {
  static propTypes={
    post: PropTypes.object.isRequired,
  }
  state = {
    detailedstatus:false
  }
  updateStatus=function(status){
    status? this.setState({detailedstatus:false}):this.setState({detailedstatus:true})
  }
  render() {
    const post = this.props.post

    return (
      <div className='card'>

        <div className="card-body">
          <div className = 'row'>
            <div className = "col-sm-6">
              <h5 className="card-title">{post.title}</h5>
            </div>
            <div className = "col-sm-3">
              <PostVote postid = {post.id}/>
            </div>
            <div className = "col-sm-3">
              <FaCaretDown onClick={(event) => this.updateStatus(this.state.detailedstatus)} size={20}/>
            </div>

          </div>
          <div>

              <div className="card-text">
                {this.state.detailedstatus? <PostCard post={post}> </PostCard> : <p></p> }
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;
