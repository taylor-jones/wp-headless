import { PureComponent, Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import TextSection from '../../TextSection/TextSection';
import css from './OurPurposePage.scss';


class OurPurposePage extends PureComponent {
  render() {
    const { post } = this.props;
    const { acf } = post;

    // console.log(post);


    return (
      <div className={css.PageContainer}>

        {/* Top Section -- Lead Content */}
        <Container className={css.StatementsWrapper}>
          <Row>
            <Col>
              <div className={css.StatementSection}>
                {/* <h1>{post.title.rendered}</h1> */}
                {/* <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}

                <h3>Why We Exist</h3>
                <div dangerouslySetInnerHTML={{ __html: acf.why_we_exist }} />

              </div>
            </Col>
          </Row>
        </Container>

        {/* Photo Mosaic */}
        <div className={css.Mosaic}>
          <div className={css.MosaicRow}>
            <div className={[css.MosaicImageWrapper, css.MosaicImageWrapperWide].join(' ')}>
              <img className={css.MosaicImage} alt="placeholder" src="../static/images/1000x600.png" />
            </div>
            <div className={[css.MosaicImageWrapper, css.MosaicImageWrapperSquare].join(' ')}>
              <img className={css.MosaicImage} alt="placeholder" src="../static/images/600x600.png" />
            </div>
          </div>
          <div className={css.MosaicRow}>
            <div className={[css.MosaicImageWrapper, css.MosaicImageWrapperSquare].join(' ')}>
              <img className={css.MosaicImage} alt="placeholder" src="../static/images/600x600.png" />
            </div>
            <div className={[css.MosaicImageWrapper, css.MosaicImageWrapperWide].join(' ')}>
              <img className={css.MosaicImage} alt="placeholder" src="../static/images/1000x600.png" />
            </div>
          </div>
        </div>

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

          <div className="separator" />

          {/* Our History */}
          <Row className={css.StatementRow}>
            <Col>
              <div className={css.StatementSection}>
                <h3>Our Story</h3>
                <div dangerouslySetInnerHTML={{ __html: acf.our_history }} />
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}



OurPurposePage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default OurPurposePage;
