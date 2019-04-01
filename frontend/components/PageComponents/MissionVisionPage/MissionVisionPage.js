import { PureComponent, Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import TextSection from '../../TextSection/TextSection';
import css from './MissionVisionPage.scss';


class MissionVisionPage extends PureComponent {
  render() {
    const { post } = this.props;
    const { acf } = post;

    console.log(post);


    return (
      <div className={css.PageContainer}>

        {/* Top Section -- Lead Content */}
        <Container class={css.StatementsWrapper}>
          <Row>
            <Col>
              <div className={css.StatementSection}>
                <h1>{post.title.rendered}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              </div>
            </Col>
          </Row>
        </Container>

        {/* Photo Gallery */}
        <div className={css.Gallery}>
          <div className={css.GalleryRow}>
            <div className={[css.GalleryImageWrapper, css.GalleryImageWrapperWide].join(' ')}>
              <img className={css.GalleryImage} alt="placeholder" src="../static/images/1000x600.png" />
            </div>
            <div className={[css.GalleryImageWrapper, css.GalleryImageWrapperSquare].join(' ')}>
              <img className={css.GalleryImage} alt="placeholder" src="../static/images/600x600.png" />
            </div>
          </div>
          <div className={css.GalleryRow}>
            <div className={[css.GalleryImageWrapper, css.GalleryImageWrapperSquare].join(' ')}>
              <img className={css.GalleryImage} alt="placeholder" src="../static/images/600x600.png" />
            </div>
            <div className={[css.GalleryImageWrapper, css.GalleryImageWrapperWide].join(' ')}>
              <img className={css.GalleryImage} alt="placeholder" src="../static/images/1000x600.png" />
            </div>
          </div>
        </div>

        {/* Mission Statement & Vision Statement */}
        <Container class={css.StatementsWrapper}>
          <Row className={css.StatementRow}>
            <Col md={6} className={css.StatementCol}>
              <div className={css.StatementWrapper}>
                <h3>Mission Statement</h3>
                <div dangerouslySetInnerHTML={{ __html: acf.mission_statement }} />
              </div>
            </Col>
            <Col md={6} className={css.StatementCol}>
              <div className={css.StatementWrapper}>
                <h3>Vision Statement</h3>
                <div dangerouslySetInnerHTML={{ __html: acf.vision_statement }} />
              </div>
            </Col>
          </Row>

          <div className="separator" />

          {/* Why We Exist */}
          <Row className={css.StatementRow}>
            <Col>
              <div className={css.StatementSection}>
                <h3>Why We Exist</h3>
                <div dangerouslySetInnerHTML={{ __html: acf.why_we_exist }} />
              </div>
            </Col>
          </Row>

          <div className="separator" />

          {/* Our History */}
          <Row className={css.StatementRow}>
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



MissionVisionPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default MissionVisionPage;