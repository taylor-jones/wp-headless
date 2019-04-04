import { PureComponent, Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import css from './MissionVisionPage.scss';


class MissionVisionPage extends PureComponent {
  render() {
    const { post } = this.props;
    const { acf } = post;

    // console.log(post);


    return (
      <div className={css.PageContainer}>

        {/* Gutenberg Content */}
        {post.content.rendered && (
          <Container className={css.StatementsWrapper}>
            <Row>
              <Col>
                <div className={css.StatementSection}>
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
              </Col>
            </Row>
          </Container>
        )}

        {/* Mission Statement & Vision Statement */}
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

      </div>
    );
  }
}



MissionVisionPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default MissionVisionPage;
