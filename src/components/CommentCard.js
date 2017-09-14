import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap';


class CommentCard extends Component {
  static propTypes={
    comment: PropTypes.object.isRequired
  }

  render() {
    const { comment } = this.props
    return (
      <div>
        <Panel header={`Comment posted on ${comment.timestamp}`} bsStyle="info">
          <p> {comment.author}: {comment.body}</p>
        </Panel>
      </div>
    )
    }
  }
export default CommentCard;
