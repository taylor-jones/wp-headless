import { PureComponent } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import css from './OurPurposePage.scss';


class OurPurposePage extends PureComponent {
  render() {
    const { post } = this.props;
    const { acf } = post;

    return (
      <div className={css.PageContainer}>

        {/* Gutenberg Content */}
        {post.content.rendered && (
          <Container className={css.StatementsWrapper}>
            <Row>
              <Col>
                <div className={css.StatementSection}>
                  {/* <h1>{post.title.rendered}</h1> */}
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
              </Col>
            </Row>
          </Container>
        )}

        {/* Why We Exist */}
        <Container className={css.StatementsWrapper}>
          <Row>
            <Col>
              <div className={css.StatementSection}>
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

        {/* Our History */}
        <Container className={css.StatementsWrapper}>
          <Row>
            <Col>
              <div className={css.StatementSection}>
                <h3>Our History</h3>
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
