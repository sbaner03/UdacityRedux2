import React, { Component } from 'react';
import '../index.css'
import PropTypes from 'prop-types'
import Post from './Post'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import AddSign from 'react-icons/lib/md/add-circle';
import { addPost, fetchAllPosts} from '../actions';
import CustomModal from './CustomModal'
import shortid from 'shortid'

class ShowPosts extends Component {
  static propTypes={
    passedcategories: PropTypes.array.isRequired
  }
  state = {
    localposts: [],
    sortingKey: 'timestamp',
    showAddPostModal: false,
    allposts:[]}

  addPostModal = (e)=>{
    this.setState({showAddPostModal: true})
  }
  close=(e)=>{
    this.setState({showAddPostModal: false})
  }

  componentDidMount() {
    this.props.getAllPosts((allposts)=>{this.setState({allposts})})
    let passedcatnamearray = this.props.passedcategories.map(x=>(x.name))
    let localposts = this.state.allposts.filter(x=>passedcatnamearray.indexOf(x.category)>-1).sort(sortBy(this.state.sortingKey))
    this.setState({localposts})
  }
  render() {
      return (

      <div className='list-posts'>
        <div>
          <br/>
          <h4> My Posts </h4>
          <div>
            <p> Put the post sorter here </p>
            {this.state.localposts.map(post => (<div key={post.id}>
                <Post post = {post} commentstatus = {this.state.commentstatus}></Post>
                </div>))}
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

//function mapStateToProps ({ posts }) {

//  return ({
//    posts: posts,
//  })
//}
const mapDispatchToProps = dispatch => ({
  addPost: () => dispatch(addPost()),
  getAllPosts: () => dispatch(fetchAllPosts())
})


export default connect(null,mapDispatchToProps)(ShowPosts)
