import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import { connect } from 'react-redux';
import { changePostVote } from '../actions';




class PostVote extends Component {
  static propTypes={
    postid: PropTypes.string.isRequired
  }


  render() {
    const posts = this.props.posts
    const changePostVote = this.props.changePostVote
    let postVote = posts.filter(x=>(x.id===this.props.postid))[0]['voteScore']
    return (
      <h5> {`Vote Score : ${postVote}`}
        <TiThumbsUp onClick={(event) => changePostVote({postid: this.props.postid,voteaction: 'up'})}/>
        <TiThumbsDown onClick={(event) => changePostVote({postid: this.props.postid,voteaction: 'down'})}/>
      </h5>
    )
  }
}


function mapStateToProps ({ posts }) {

  return {
  posts: posts}
};

const mapDispatchToProps = dispatch => ({
  changePostVote: (postid,action) => dispatch(changePostVote(postid,action))
})

export default connect(mapStateToProps,mapDispatchToProps)(PostVote)
