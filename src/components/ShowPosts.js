import React, { Component } from 'react';
import '../index.css'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import AddSign from 'react-icons/lib/md/add-circle';
import { addPost, fetchAllPosts, fetchPostComments} from '../actions';
import CustomModal from './CustomModal'
import shortid from 'shortid'
import { MenuItem, DropdownButton} from 'react-bootstrap'

class ShowPosts extends Component {
//  constructor(props) {
//     super(props)
//     props.getAllPosts()
//  }

  state = {
    showAddPostModal: false,
    localposts:[],
  }
  static propTypes={
    passedcategories: PropTypes.array.isRequired
  }
  componentWillMount(){
    let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
    this.props.getAllPosts(posts=>this.setState({localposts:posts.filter(x=>passedcatnamearray.indexOf(x.category)>-1)}))
  }

  addPostModal = (e)=>{
    this.setState({showAddPostModal: true})
  }
  close=(e)=>{
    this.setState({showAddPostModal: false})
  }

  sortList=(e)=>{
    let localposts = this.state.localposts
    localposts.sort(sortBy(e))
    this.setState({localposts})
  }


  render() {
      return (

      <div className='list-posts'>
        <div>
          <br/>
          <h4> My Posts </h4>
          <div>
            {this.state.localposts.map(post => (<div key={post.id}>
                <Post post = {post}></Post>
                </div>))}
                <DropdownButton bsStyle='primary' title='SortBy' id='dropdown-basic-2' onSelect = {this.sortList}>
                  <MenuItem eventKey= "1" key = {shortid.generate()}> TimeStamp </MenuItem>
                  <MenuItem eventKey= "2" key = {shortid.generate()}> Vote Score </MenuItem>
                </DropdownButton>

          </div>
        </div>
        <div>
          <p> <span> <i> Add Post </i> </span> <AddSign onClick={this.addPostModal} size={30}/> </p>
          <CustomModal show={this.state.showAddPostModal} onHide={this.close} elementid = {shortid.generate()} close = {this.close}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {

  return ({
    posts: posts,
  })
}
const mapDispatchToProps = dispatch => ({
  addPost: () => dispatch(addPost()),
  getAllPosts: () => fetchAllPosts()(dispatch),
  getPostComments: (postid) => fetchPostComments(postid)(dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(ShowPosts)
