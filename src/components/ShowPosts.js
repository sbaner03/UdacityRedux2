import React, { Component } from 'react';
import '../index.css'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import AddSign from 'react-icons/lib/md/add-circle';
import { postPost, fetchAllPosts, fetchPostComments, sortAllPosts} from '../actions';
import { DropdownButton, MenuItem,Modal,Button, FormGroup, FormControl} from 'react-bootstrap'
import capitalize from 'capitalize'
import shortid from 'shortid'



class ShowPosts extends Component {
  componentWillMount(){
    this.props.getAllPosts()
  }
  static propTypes={
    passedcategories: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired
  }
  state = {
    showAddPostModal: false,
    formfieldlist: ['author','title','body','category']
    }
  sortPostsBy = (e)=>{
      console.log('event',e)
      this.props.sortPosts(e,this.props.posts)
    }

  addPostModal = (e)=>{
    this.setState({showAddPostModal: true})
  }
  close=(e)=>{
    this.setState({showAddPostModal: false})
  }

  submitForm = (e)=>{
    this.props.newPost['id'] = shortid.generate()
    this.props.newPost['timestamp'] = Date.now()
    this.props.addPostprop(this.props.newPost)
  }
  handleChange = (e,field)=>{
    this.props.newPost[field] = e.target.value
  }


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
                      <MenuItem eventKey = 'other' key={shortid.generate()}>Others</MenuItem>
                  </DropdownButton>
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
  addPostprop: (post) => postPost(post)(dispatch),
  getAllPosts: () => fetchAllPosts()(dispatch),
  getPostComments: (postid) => fetchPostComments(postid)(dispatch),
  sortPosts: (key,posts)=> sortAllPosts(key,posts)(dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(ShowPosts)
