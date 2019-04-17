import { PureComponent, Fragment } from 'react';
import Link from 'next/link';
import { Container } from 'react-grid-system';
import PropTypes from 'prop-types';
import { Picture } from 'react-responsive-picture';
import css from './MissionPage.scss';


class MissionPage extends PureComponent {
  render() {
    const { post } = this.props;
    const { acf } = post;

    return (
      <Fragment>
        <div className={css.PageContainer}>
          <Container>

            {/* Principles */}
            {acf.principles.map((principle, index) => {
              return (
                <div className={css.Block} key={index}>
                  <div className={css.BlockImageWrapper}>
                    <Picture
                      className={css.BlockImage}
                      alt={principle.image.alt}
                      sources={[
                        { srcSet: principle.image.sizes['hero-sm-portrait'] },
                      ]}
                    />
                  </div>

                  <div className={css.BlockTextWrapper}>
                    <div className={css.BlockText}>
                      <h3 className={css.BlockTextHeading}>{principle.heading}</h3>
                      <div className={css.BlockTextBody} dangerouslySetInnerHTML={{ __html: principle.description }} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className={css.Block}>
              <p className="lead">
                Learn more about
                <Link href="/post?slug=services&apiRoute=page" as="/services">
                  <a role="link"> the types of services </a>
                </Link>
                that Synergy In Action offers.
              </p>
            </div>
          </Container>
        </div>

      </Fragment>
    );
  }
}


MissionPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default MissionPage;
