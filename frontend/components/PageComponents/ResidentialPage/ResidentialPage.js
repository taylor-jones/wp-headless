import { PureComponent, Fragment } from 'react';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import TextSection from '../../TextSection/TextSection';
import css from './ResidentialPage.scss';
import { getServicesByCategory } from '../../../lib/serviceUtils';



class ResidentialPage extends PureComponent {
  render() {
    const { post } = this.props;
    post.services = getServicesByCategory(post.services, post.slug);

    return (
      <div>
        <Container>
          <Row>
            <Col sm={12}>
              <div className={css.LeadWrapper}>
                <TextSection
                  heading={post.title.rendered}
                  align="center"
                  alignContent="left"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </TextSection>
              </div>
            </Col>
          </Row>
        </Container>


        <Container className={css.BlockContainer}>
          {post.services.map(service => {
            const strippedExcerpt = sanitizeHtml(service.excerpt.rendered, {
              allowedTags: [],
            });

            return (
              <div className={css.BlockWrapper} key={service.id}>
                <div className={css.BlockImageWrapper}>
                  <div
                    className={css.BlockImage}
                    style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                  />
                </div>

                <div className={css.BlockTextWrapper}>
                  <div className={css.BlockTextWrapperInner}>
                    <div className={css.BlockHeadingWrapper}>
                      <div className={css.BlockHeading}>{service.title.rendered}</div>
                    </div>
                    <div className={css.BlockText}>
                      {strippedExcerpt}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}

ResidentialPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResidentialPage;
