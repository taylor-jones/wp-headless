import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Comment extends PureComponent {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    ReactDOM.unmountComponentAtNode(node);
    node.outerHTML = this.createComment();
  }

  createComment() {
    const { text, trim } = this.props;
    const comment = trim ? text.trim() : text;
    return `<!-- ${comment} -->`;
  }

  render() {
    return (
      <div />
    );
  }
}

Comment.defaultProps = {
  trim: true,
};

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  trim: PropTypes.bool,
};

export default Comment;
