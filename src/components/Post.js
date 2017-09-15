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

class Post extends Component {
  static propTypes={
    post: PropTypes.object.isRequired,
    newdata: PropTypes.object.isRequired
  }
  state = {
    detailedstatus:false,
    showEditPostModal: false,
    editformfieldlist: ['title','body']
  }
  updateStatus=function(status){
    status? this.setState({detailedstatus:false}):this.setState({detailedstatus:true})
  }
  changeVote = (e,voteaction)=>{
    let optionval = voteaction==='up'?'upVote': 'downVote'
    let option = {'option':optionval}
    this.props.changePostVoteprop (this.props.post,option)
  }

  editPostModal = (e)=>{
    this.setState({showEditPostModal:true})
  }

  submitForm = (e)=>{
    this.props.puteditPostprop(this.props.post, this.props.newdata)
  }
  handleChange = (e,field)=>{
    this.props.newdata[field] = e.target.value
  }
  close=(e)=>{
    this.setState({showEditPostModal: false})
  }
  deletePost = (e)=>{
    this.props.deletePostprop(this.props.post)
  }


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
  changePostVoteprop: (post,option)=> postPostVote(post,option)(dispatch),
  puteditPostprop: (post,newdata)=> puteditPost(post,newdata)(dispatch),
  deletePostprop: (post)=> deletePost(post)(dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(Post);
