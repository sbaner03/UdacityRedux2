import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostComments, sortAllComments , postComment } from '../actions'
import shortid from 'shortid'
import { DropdownButton, MenuItem,Panel,Modal } from 'react-bootstrap'
import capitalize from 'capitalize'




class PostCard extends Component {
  static propTypes={
    post: PropTypes.object.isRequired
  }

  sortCommentsBy=(e)=>{
    this.props.sortComments(e,this.props.comments)
  }

  componentWillMount(){
    this.props.getPostComments(this.props.post.id)
  }
  state = {
    showAddCommentModal: false,
    formfieldlist: ['author','title','body','category']
    }

  addCommentModal = (e)=>{
    this.setState({showAddCommentModal: true})
  }
  close=(e)=>{
    this.setState({showAddCommentModal: false})
  }

  submitForm = (e)=>{
    this.props.newComment['id'] = shortid.generate()
    this.props.newComment['timestamp'] = Date.now()
    this.props.newComment['parentId'] = this.post.id
    this.props.addCommentprop(this.props.newComment)
  }
  handleChange = (e,field)=>{
    this.props.newPost[field] = e.target.value
  }


  render() {
    const post = this.props.post
    const postcomments = this.props.comments.filter(x=>(x.parentId===post.id && x.deleted===false))
    let postheader = `Post Category: ${capitalize(post.category)} Posted on: ${post.timestamp}`
    return (
      <div>
        {postcomments.length<=0?<p></p>:
          <DropdownButton bsStyle='primary' title='Sort Comments' id='dropdown-basic-1' onSelect = {this.sortCommentsBy}>
            <MenuItem eventKey='voteScore' key = {shortid.generate()}> Vote Score </MenuItem>
            <MenuItem eventKey='timestamp' key = {shortid.generate()}> Time Stamp </MenuItem>
          </DropdownButton>
        }
        <Panel header={postheader} bsStyle="primary">
          <p> {post.author}: {post.body}</p>
          {postcomments.length===0? <h5> 'No Comments for this Post' </h5>:
          <div>
            {postcomments.map(comment=>(
                    <Panel header={`Comment posted on ${comment.timestamp}`} bsStyle="info" key = {shortid.generate()}>
                      <p> {comment.author}: {comment.body}</p>
                    </Panel>))}
          </div>}
        </Panel>
        <Modal>
        </Modal>
      </div>
    )
    }
  }

function mapStateToProps ({comments}) {
  return ({
    comments: comments
  })
}

const mapDispatchToProps = dispatch => ({
  getPostComments: (postid) => fetchPostComments(postid)(dispatch),
  sortComments: (key,comments)=> sortAllComments(key,comments)(dispatch),
  addCommentprop: (comment) => postComment(comment)(dispatch),

})

export default connect(mapStateToProps,mapDispatchToProps)(PostCard)
