import { PureComponent, Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { Picture } from 'react-responsive-picture';
import css from './MissionPage.scss';


class MissionPage extends PureComponent {
  render() {
    const { post } = this.props;
    const { acf } = post;

    // console.log(post);

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
                        { srcSet: principle.image.sizes.medium_large, media: '(max-width: 1127px)' },
                        { srcSet: principle.image.sizes.medium },
                      ]}
                    />
                  </div>

                  <div className={css.BlockTextWrapper}>
                    <div className={css.BlockText}>
                      <div className={css.BlockTextHeading}>
                        <h3>{principle.heading}</h3>
                      </div>
                      <div className={css.BlockTextBody}>
                        <div dangerouslySetInnerHTML={{ __html: principle.description }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </Container>
        </div>


        {/* Mission Statement & Vision Statement */}
        {/* <div className={css.PageContainer}>
          <Container className={css.StatementsWrapper}>
            <Row className={css.StatementRow}>
              <Col md={6} className={css.StatementCol}>
                <div className={css.StatementWrapper}>
                  <h3>Our Mission</h3>
                  <div dangerouslySetInnerHTML={{ __html: acf.mission_statement }} />
                </div>
              </Col>
              <Col md={6} className={css.StatementCol}>
                <div className={css.StatementWrapper}>
                  <h3>Our Vision</h3>
                  <div dangerouslySetInnerHTML={{ __html: acf.vision_statement }} />
                </div>
              </Col>
            </Row>
          </Container>
        </div> */}

      </Fragment>
    );
  }
}


MissionPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default MissionPage;
