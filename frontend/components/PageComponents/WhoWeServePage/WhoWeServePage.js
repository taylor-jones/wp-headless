import React, { PureComponent, Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import css from './WhoWeServePage.scss';

class WhoWeServePage extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <div className={css.PageContainer}>
        <div className={css.PageWrapper}>
          <div className={css.WpEditor} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

          <p className="lead strong">
            <Link prefetch href="/post?slug=services&apiRoute=page" as="/services">
              <a role="link">Learn more about the types of services we provide.</a>
            </Link>
          </p>

          <div className="separator" />

          <h2 className="heading">Our Participants</h2>
          <p>The following charts reflect our most recent demographics data.</p>

        </div>
      </div>
    );
  }
}

WhoWeServePage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default WhoWeServePage;
