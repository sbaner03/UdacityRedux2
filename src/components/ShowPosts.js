// This is the ShowPosts component - this is the parent component for all the post related information
// Functionality in this component includes actions that are not related to an indivual post:
//  - Sort posts based on dropdown selection of sorting criteria
//  - Enter a new post using a Modal
// Post specific actions are delegated to the Post component which is passed the specific post as prop
import React, { Component } from 'react';
import '../index.css'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import AddSign from 'react-icons/lib/md/add-circle';
import { postPost, fetchAllPosts, fetchPostComments, sortAllPosts} from '../actions';
import { DropdownButton, MenuItem,Modal,Button, FormGroup, FormControl,Alert } from 'react-bootstrap'
import capitalize from 'capitalize'
import shortid from 'shortid'
// componentWillMount invokes the getAllPosts which in turn is linked to the action creator fetchAllPosts
// fetchAllPosts has an async API call which once resolved dispatches
// an action (RECEIVE_ALL_POSTS from the action creator getAllPosts - please refer to ../action/index.js)
// to initialize the store with all the posts retrived from the api.
// The action creator method fetchAllPosts is made available in this component through mapDispatchToProps via connect()
// A similar template is used for postPost, fetchPostComments, sortAllPosts for being made accessible in this component
class ShowPosts extends Component {
  componentWillMount(){
    this.props.getAllPosts()
  }
// passedcategories is passed from App - array that contains the categories which ShowPosts needs to render
// newPost is an object that is used as 'placeholder' for the fields of the newPost
  static propTypes={
    passedcategories: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired
  }
// local state is used for for opening closing the Modal (showAddPostModal) and
// formfieldlist which is used in the modal to automatically generate the form for data entry
// In real world applications, formfieldlist can be retrived from a database making the entire form rendering
// and data capture dynamic
  state = {
    showAddPostModal: false,
    formfieldlist: ['author','title','body'],
    }
// method to sort posts based on the selection of the DropdownButton component
  sortPostsBy = (e)=>{
      this.props.sortPosts(e,this.props.posts)
    }
// method to open the Modal based on setting the state from input from the AddSign component
  addPostModal = (e)=>{
    this.setState({showAddPostModal: true})
  }
// method to close the Modal based on setting the state
  close=(e)=>{
    this.setState({showAddPostModal: false})
  }
// submit the data for a newPost based on data entered into the prop newPost. Each of the fields of
// the prop newPost is entered through the handle method associated with each FormControl component
// generated for each field in formfieldlist. This generates the form dynamically and also captures the user
// input of each form field by mapping them to newPost. In submitForm the last step is to use the
// addPostprop method to submit the data for a newPost to the API (via postPost action creator)
// Form validation can also be built into this method
  submitForm = (e)=>{
    this.props.newPost['id'] = shortid.generate()
    this.props.newPost['timestamp'] = Date.now()
    this.props.addPostprop(this.props.newPost)
  }
// handleChange method is generated for each of the fields in formfieldlist and is accessed through
// each of the FormControl components created. Each field is mapped back as a key of the newPost object
// and therefore entered independently as a user enters data into the text box
  handleChange = (e,field)=>{
    this.props.newPost[field] = e.target.value
  }
// handleCatSelection method is used to specifically assign the value of the selected category
// an alert is used to inform the user of her choice of category
  handleCatSelection=(e)=>{
    this.props.newPost['category'] = e
    alert(`You wish to add a post to ${capitalize(e)} category`)
  }

// 3 critical components being rendered:
// a) DropdownButton component for sorting
// b) AddSign component to open the Modal component
// c) Modal component which presents the form for the new post data entry
  render() {
      let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
      let localposts = this.props.posts.filter(x=> passedcatnamearray.indexOf(x.category)>-1 && x.deleted === false)
      return (

      <div className='list-posts'>
        <div>
          <br/>
          <h4> My Posts </h4>
          <div>
            <DropdownButton bsStyle='primary' title='Sort Posts' id='dropdown-basic-1' onSelect = {this.sortPostsBy}>
              <MenuItem eventKey='voteScore' key = {shortid.generate()}> Votes </MenuItem>
              <MenuItem eventKey='timestamp' key = {shortid.generate()}> Time Stamp </MenuItem>
            </DropdownButton>
            {localposts.map(post => (<div key = {shortid.generate()}>
                <Post post = {post} newdata = {{'title': null,'body': null}}></Post>
                </div>))}
          </div>
        </div>
        <div>
          <p> <span> <i> Add Post </i> </span> <AddSign onClick={this.addPostModal} size={30}/> </p>
          <Modal show={this.state.showAddPostModal} onHide={this.close}>
            <div>
                <Modal.Header closeButton>
                  <Modal.Title>Enter New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DropdownButton bsStyle='primary' title='Select Category' id='dropdown-basic-1' onSelect = {this.handleCatSelection}>
                      {this.props.categories.map(x=>(<MenuItem eventKey= {x.name} key = {shortid.generate()}> {capitalize(x.name)} </MenuItem>))}
                  </DropdownButton>
                  <Alert bsStyle="warning">
                    <p> <strong>{this.props.newPost['category']}</strong> </p>
                  </Alert>
                  <FormGroup controlId="formEnterCategory" >
                    {this.state.formfieldlist.map(field=>(
                        <FormControl key = {shortid.generate()} type='text' defaultValue= {`${capitalize(field)} of Post`} placeholder="Enter text" onChange={event => this.handleChange(event,field)}/>
                    ))}
                    <br/>
                    <Button bsStyle='primary' title='form submit' id='form-submit-basic-1' onClick = {this.submitForm}> Submit </Button>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </div>
          </Modal>

        </div>
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
  addPostprop: (post) => postPost(post)(dispatch), // add new post
  getAllPosts: () => fetchAllPosts()(dispatch), // get all posts
  getPostComments: (postid) => fetchPostComments(postid)(dispatch), // get all comments of a post
  sortPosts: (key,posts)=> dispatch(sortAllPosts(key,posts)) // sort posts based on key selected
})

export default connect(mapStateToProps,mapDispatchToProps)(ShowPosts)
