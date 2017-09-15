import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostComments, sortAllComments , postComment,postCommentVote,puteditComment,deleteComment } from '../actions'
import shortid from 'shortid'
import { DropdownButton, MenuItem,Panel,Modal,FormGroup,FormControl,Button } from 'react-bootstrap'
import capitalize from 'capitalize'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import FaClose from 'react-icons/lib/fa/close'
import FaEdit from 'react-icons/lib/fa/edit'
import AddSign from 'react-icons/lib/md/add-circle';

class PostCard extends Component {
  static propTypes={
    post: PropTypes.object.isRequired,
    newComment: PropTypes.object.isRequired
  }

  sortCommentsBy=(e)=>{
    this.props.sortComments(e,this.props.comments)
  }

  componentWillMount(){
    this.props.getPostComments(this.props.post.id)
  }
  state = {
    showAddCommentModal: false,
    showEditCommentModal: false,
    addformfieldlist: ['author','body'],
    editformfieldlist: ['body']
    }

  addCommentModal = (e)=>{
    this.setState({showAddCommentModal: true})
  }
  editCommentModal=(e)=>{
    this.setState({showEditCommentModal: true})
  }
  closeAddModal=(e)=>{
    this.setState({showAddCommentModal: false})
  }

  submitAddForm = (e,postid)=>{
    let newComment = this.props.newComment
    newComment['id'] = shortid.generate()
    newComment['timestamp'] = Date.now()
    newComment['parentId'] = postid
    this.props.addCommentprop(newComment)
  }
  handleAddChange = (e,field)=>{
    this.props.newComment[field] = e.target.value
  }
  changeVote = (e,voteaction,comment)=>{
    let optionval = voteaction==='up'?'upVote': 'downVote'
    let option = {'option':optionval}
    this.props.changeCommentVoteprop (comment,option)
  }
  deleteComment = (e,comment)=>{
    this.props.deleteCommentprop(comment)
  }

  //
  closeEditModal=(e)=>{
    this.setState({showEditCommentModal: false})
  }

  submitEditForm = (e,comment)=>{
    let newComment = {}
    newComment['timestamp'] = Date.now()
    newComment['body'] = this.props.newComment['body']
    this.props.puteditCommentprop(comment,newComment)
  }
  handleEditChange = (e,field)=>{
    this.props.newComment[field] = e.target.value
  }



  render() {
    const post = this.props.post
    const postcomments = this.props.comments.filter(x=>(x.parentId===post.id && x.deleted===false))
    let postheader = `Post Category: ${capitalize(post.category)} Posted on: ${post.timestamp}`
    console.log(postcomments)
    return (
      <div>
        {postcomments.length<=0?<p></p>:
          <div>
            <DropdownButton bsStyle='primary' title='Sort Comments' id='dropdown-basic-1' onSelect = {this.sortCommentsBy}>
              <MenuItem eventKey='voteScore' key = {shortid.generate()}> Vote Score </MenuItem>
              <MenuItem eventKey='timestamp' key = {shortid.generate()}> Time Stamp </MenuItem>
            </DropdownButton>
          </div>
        }
        <Panel header={postheader} bsStyle="primary">
          <p> {post.author}: {post.body}</p>
          {postcomments.length===0?
            <div>
              <h5> 'No Comments for this Post' </h5>
              <AddSign onClick={this.addCommentModal} size={20}/>
              <Modal show={this.state.showAddCommentModal} onHide={this.closeAddModal} key = {shortid.generate()}>
                <div>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <FormGroup controlId="formEnterComment" >
                        {this.state.addformfieldlist.map(field=>(
                            <FormControl key = {shortid.generate()} type='text' defaultValue= {`Comment ${field}`} placeholder="Enter text" onChange={event => this.handleAddChange(event,field)}/>
                        ))}
                        <br/>
                        <Button bsStyle='primary' title='form submit' id='form-submit-basic-1' onClick = {event=>this.submitAddForm(event,post.id)}> Submit Changes </Button>
                      </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.closeAddModal}>Close</Button>
                    </Modal.Footer>
                </div>
              </Modal>

            </div>:
          <div>
            {postcomments.map(comment=>(
                    <div key = {shortid.generate()}>
                      <Panel header={`Comment posted on ${comment.timestamp}`} bsStyle="info" key = {shortid.generate()}>
                        <p> {comment.author}: {comment.body}</p>
                        <div>
                          <p>
                            {`Votes ${comment.voteScore}`}
                            <TiThumbsUp onClick={(event) => this.changeVote(event,"up",comment)}/>
                            <TiThumbsDown onClick={(event) => this.changeVote(event,"down",comment)}/>
                            <AddSign onClick={this.addCommentModal} size={20}/>
                            <FaEdit onClick={this.editCommentModal} size={20}/>
                            <FaClose onClick={(event) => this.deleteComment(event,comment)}/>
                          </p>
                        </div>
                      </Panel>
                      <Modal show={this.state.showAddCommentModal} onHide={this.closeAddModal} key = {shortid.generate()}>
                        <div>
                            <Modal.Header closeButton>
                              <Modal.Title>Add Comment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <FormGroup controlId="formEnterComment" >
                                {this.state.addformfieldlist.map(field=>(
                                    <FormControl key = {shortid.generate()} type='text' defaultValue= {`Comment ${field}`} placeholder="Enter text" onChange={event => this.handleAddChange(event,field)}/>
                                ))}
                                <br/>
                                <Button bsStyle='primary' title='form submit' id='form-submit-basic-1' onClick = {event=>this.submitAddForm(event,post.id)}> Submit Changes </Button>
                              </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button onClick={this.closeAddModal}>Close</Button>
                            </Modal.Footer>
                        </div>
                      </Modal>
                      <Modal show={this.state.showEditCommentModal} onHide={this.closeEditModal} key = {shortid.generate()}>
                        <div>
                            <Modal.Header closeButton>
                              <Modal.Title>Edit Comment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <FormGroup controlId="formEditComment" >
                                {this.state.editformfieldlist.map(field=>(
                                    <FormControl key = {shortid.generate()} type='text' defaultValue= {comment[field]} placeholder="Enter text" onChange={event => this.handleEditChange(event,field)}/>
                                ))}
                                <br/>
                                <Button bsStyle='primary' title='form submit' id='form-submit-basic-1' onClick = {event=>this.submitEditForm(event,comment)}> Submit Changes </Button>
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button onClick={this.closeEditModal}>Close</Button>
                            </Modal.Footer>
                        </div>
                      </Modal>
                    </div>
                  ))}
          </div>}
        </Panel>
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
  changeCommentVoteprop: (comment,option) => postCommentVote(comment,option)(dispatch),
  puteditCommentprop: (comment,newdata) => puteditComment(comment,newdata)(dispatch),
  deleteCommentprop: (comment)=> deleteComment(comment)(dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(PostCard)
