/* eslint-disable react/no-find-dom-node */

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class HtmlComment extends PureComponent {
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
    return <div />;
  }
}

HtmlComment.defaultProps = {
  trim: true,
};

HtmlComment.propTypes = {
  text: PropTypes.string.isRequired,
  trim: PropTypes.bool,
};

export default HtmlComment;
