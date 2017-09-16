// This is the Post component - this is the parent component for all the information and actions for an individual post
// Functionality in this component includes actions that are related to an indivual post:
//  - Vote on a post
//  - Display the details of a post including its comments
//  - Edit the fields of a post
//  - Delete a post
// Comment specific actions could have been also incorporated in this component. However for the sake of simplicity
// the comment specific actions have been delegated to the component PostCard (could have been better named!!!)
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import FaCaretDown from 'react-icons/lib/fa/caret-square-o-down';
import '../index.css'
import PostCard from './PostCard'
import { postPostVote , puteditPost, deletePost} from '../actions'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit'
import FaClose from 'react-icons/lib/fa/close'
import { connect } from 'react-redux'
import {Modal,Button, FormGroup, FormControl} from 'react-bootstrap'
import shortid from 'shortid'

// Props passed includes the post and newdata. newdata is an object with all the fields of a
// post which is the structure that holds all the data entered into the fields of the modal
class Post extends Component {
  static propTypes={
    post: PropTypes.object.isRequired,
    newdata: PropTypes.object.isRequired
  }
// Local state includes fields for local display and form data capture.
// detailedstatus is a flag which is set to true or false to show the details of a post.
// showEditPostModal is a flag to open and close the Modal for editing a post
// editformfieldlist fields of a post which can be editied
  state = {
    detailedstatus:false,
    showEditPostModal: false,
    editformfieldlist: ['title','body']
  }
// updateStatus method is used to capture the user input from FaCaretDown component
  updateStatus=function(status){
    status? this.setState({detailedstatus:false}):this.setState({detailedstatus:true})
  }
// changeVote method is used to upVote or downVote a post based on user input from
// TiThumbsUp and TiThumbsDown components. changePostVoteprop is linked to the
// action creator changePostVoteprop
  changeVote = (e,voteaction)=>{
    let optionval = voteaction==='up'?'upVote': 'downVote'
    let option = {'option':optionval}
    this.props.changePostVoteprop (this.props.post,option)
  }
// editPostModal method is used to open the Modal with input from FaEdit component
  editPostModal = (e)=>{
    this.setState({showEditPostModal:true})
  }
// submitForm method is used to submit the form in the Modal component
// puteditPostprop is linked to the action creator puteditPost
  submitForm = (e)=>{
    this.props.puteditPostprop(this.props.post, this.props.newdata)
  }
// handleChange method is generated for each of the fields in editformfieldlist and is accessed through
// each of the FormControl components created. Each field is mapped back as a key of the newdata object
// and therefore entered independently as a user enters data into the text box to edit a post
  handleChange = (e,field)=>{
    this.props.newdata[field] = e.target.value
  }
// method to close the Modal based on setting the state
  close=(e)=>{
    this.setState({showEditPostModal: false})
  }
// deletePost method is used to delete a post
// deletePostprop is linked to the action creator deletePost
  deletePost = (e)=>{
    this.props.deletePostprop(this.props.post)
  }

// 4 critical components being rendered:
// a) FaEdit component to open the Modal component to edit a post
// b) TiThumbsUp and  TiThumbsDown components to vote on a post
// c) FaCaretDown to provide the details of a post
// d) Modal component which presents the form to edit a post
  render() {
    const post = this.props.post

    return (
      <div>
        <div className='card'>

          <div className="card-body">
            <div className = 'row'>
              <div className = "col-sm-4">
                <h5 className="card-title">{post.title}</h5>
              </div>
              <div className = "col-sm-2">
                <FaEdit onClick={(event) => this.editPostModal(event)} size = {20}/>
              </div>
              <div className = "col-sm-2">
                <h5> {`Votes : ${post.voteScore}`}
                  <TiThumbsUp onClick={(event) => this.changeVote(event,"up") } size = {30}/>
                  <TiThumbsDown onClick={(event) => this.changeVote(event,"down")} size = {30}/>
                </h5>
              </div>
              <div className = "col-sm-2">
                <FaCaretDown onClick={(event) => this.updateStatus(this.state.detailedstatus)} size={20}/>
              </div>
              <div className = "col-sm-2">
                <FaClose onClick={(event) => this.deletePost(event)} size = {20}/>
              </div>

            </div>
            <div>

                <div className="card-text">
                  {this.state.detailedstatus? <PostCard post={post} newComment={{'title':null,'body':null}}> </PostCard> : <p></p> }
                </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.showEditPostModal} onHide={this.close}>
          <div>
              <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formEnterCategory" >
                  {this.state.editformfieldlist.map(field=>(
                      <FormControl key = {shortid.generate()} type='text' defaultValue= {`${post[field]}`} placeholder="Enter text" onChange={event => this.handleChange(event,field)}/>
                  ))}
                  <br/>
                  <Button bsStyle='primary' title='form submit' id='form-submit-basic-1' onClick = {this.submitForm}> Submit Changes </Button>
                  </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
          </div>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps ({ posts,categories }) {

  return ({
    posts: posts,
    categories: categories
  })
}
const mapDispatchToProps = dispatch => ({
  changePostVoteprop: (post,option)=> postPostVote(post,option)(dispatch), // pass the vote data and post to the action creator
  puteditPostprop: (post,newdata)=> puteditPost(post,newdata)(dispatch), // pass the edited post data to the action creator
  deletePostprop: (post)=> deletePost(post)(dispatch) // pass the post to be deleted to the action creator
})
export default connect(mapStateToProps,mapDispatchToProps)(Post);
