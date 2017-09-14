import React, { Component } from 'react';
import '../index.css'
import PropTypes from 'prop-types'
//import { addPost, addComment } from '../actions';
import { Modal,Button, DropdownButton, MenuItem} from 'react-bootstrap'
import { connect } from 'react-redux'
import capitalize from 'capitalize'
import shortid from 'shortid'
import CustomerFormGroup from './CustomFormGroup'


class CustomModal extends Component {
  static propTypes={
    show: PropTypes.bool.isRequired,
    elementid: PropTypes.string.isRequired,
  }

  state ={
    catflag: false
  }
  handleCatSelection = (e)=>{
    e==='other'?this.setState({catflag:true}):this.setState({catflag:false})
  }


  render() {
        return (

        <div className="static-modal">
          <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Enter New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DropdownButton bsStyle='primary' title='Select Category' id='dropdown-basic-1' onSelect = {this.handleCatSelection}>
                  {this.props.categories.map(x=>(<MenuItem eventKey= {x.name} key = {shortid.generate()}> {capitalize(x.name)} </MenuItem>))}
                  <MenuItem eventKey = 'other' key={shortid.generate()}>Others</MenuItem>
              </DropdownButton>
              { this.state.catflag? <CustomerFormGroup formfieldlist = {['category','author','body','title','voteScore']} />:
                                    <CustomerFormGroup formfieldlist = {['author','body','title','voteScore']} />
              }
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
  }
}

function mapStateToProps ({categories }) {

  return ({
    categories: categories
  })
}
export default connect(mapStateToProps)(CustomModal);
//<ControlLabel key = {shortid.generate()}>`Enter New ${capitalize(x)}`</ControlLabel>
