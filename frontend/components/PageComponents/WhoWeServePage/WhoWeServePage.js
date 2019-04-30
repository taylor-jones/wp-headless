import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import css from './WhoWeServePage.scss';

class WhoWeServePage extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <div className={css.PageContainer}>
        <div className={css.PageWrapper}>
          <div className={css.WpEditor} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </div>
    );
  }
}

WhoWeServePage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default WhoWeServePage;
