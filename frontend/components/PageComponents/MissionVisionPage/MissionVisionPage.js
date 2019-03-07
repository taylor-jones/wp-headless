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
    // console.log(post);


    return (
      <div className={css.PageContainer}>

        {/* Top Section -- Lead Content */}
        <Container>
          <Row>
            <Col>
              <div className={css.LeadWrapper}>
                <TextSection
                  heading={post.title.rendered}
                  strongHeading
                  align="center"
                  alignContent="left"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </TextSection>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Photo Gallery */}
        <div className={css.Gallery}>
          <div className={css.GalleryRow}>
            <div className={[css.GalleryImageWrapper, css.GalleryImageWrapperWide].join(' ')}>
              <img className={css.GalleryImage} alt="placeholder" src="../static/images/1200x600.png" />
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
              <img className={css.GalleryImage} alt="placeholder" src="../static/images/1200x600.png" />
            </div>
          </div>
        </div>

      </div>
    );
  }
}



MissionVisionPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default MissionVisionPage;
