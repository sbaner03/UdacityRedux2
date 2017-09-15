import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Button, FormGroup, FormControl} from 'react-bootstrap'
import capitalize from 'capitalize'
import shortid from 'shortid'
import {postPost} from '../actions'
import {connect} from 'react-redux'



class CustomFormGroup extends Component{

  static propTypes={
    formfieldlist: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired
  }
  state = {
    postid: '',
    res: []
  }

  handleChange = (e,field)=>{
    this.props.newPost[field] = e.target.value
  }

  submitForm = (e)=>{
    this.props.newPost['timestamp'] = Date.now()
    console.log(this.props.newPost)
    this.props.addPost(this.props.newPost)
  }

  render(){
    console.log(this.props.newPost)
    return (
      <FormGroup controlId="formEnterCategory" >
      {this.props.formfieldlist.map(field=>(
          <FormControl key = {shortid.generate()} type='text' defaultValue= {`${capitalize(field)} of Post`} placeholder="Enter text" onChange={event => this.handleChange(event,field)}/>
      ))}
      <br/>
      <Button bsStyle='primary' title='form submit' id='form-submit-basic-1' onClick = {this.submitForm}> Submit </Button>
      </FormGroup>

    )
  }
}

function mapStateToProps ({ posts }) {

  return ({
    posts: posts,
  })
}
const mapDispatchToProps = dispatch => ({
  addPost: (newPost) => dispatch(postPost(newPost))
})


export default connect(mapStateToProps,mapDispatchToProps)(CustomFormGroup)
