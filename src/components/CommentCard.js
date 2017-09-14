import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap';


class CommentCard extends Component {
  static propTypes={
    comment: PropTypes.object.isRequired
  }

  render() {  
    return (
      <div>
        <Panel header={`Comment posted on ${this.props.comment.timestamp}`} bsStyle="info">
          <p> {this.props.comment.author}: {this.props.comment.body}</p>
        </Panel>
      </div>
    )
    }
  }
export default CommentCard;
