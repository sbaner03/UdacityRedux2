import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Button, FormGroup, FormControl} from 'react-bootstrap'
//import { connect } from 'react-redux'
import capitalize from 'capitalize'
import shortid from 'shortid'



class CustomFormGroup extends Component{
  static propTypes={
    formfieldlist: PropTypes.array.isRequired,
  }
  state = {
    newPost: {
      'author': null,
      'body':null,
      'deleted':null,
      'id':null,
      'timestamp':null,
      'title':null,
      'voteScore': null
    }
  }
  handleChange = (e,field)=>{
      let newObj = {}
      let f = field['x']
      newObj[f] = e.target.value
      console.log(newObj,this.state.newPost)
      this.setState({newPost: Object.assign({},this.state.newPost,newObj)})
  }

  submitForm = (e)=>{
    console.log(this.state.newPost)
    // hook this up with the addPost method
  }

  render(){
    return (
      <FormGroup controlId="formEnterCategory" >
      {this.props.formfieldlist.map(x=>(
          <FormControl key = {shortid.generate()} type='text' defaultValue= {`${capitalize(x)} of Post`} placeholder="Enter text" onChange={event => this.handleChange(event,{x})}/>
      ))}
      <br/>
      <Button bsStyle='primary' title='form submit' id='form-submit-basic-1' onClick = {this.submitForm}> Submit </Button>
      </FormGroup>

    )
  }
}
export default CustomFormGroup;
