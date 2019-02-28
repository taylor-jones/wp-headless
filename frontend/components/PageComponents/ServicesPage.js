import { PureComponent } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import TextSection from '../TextSection/TextSection';
import css from './ServicesPage.scss';

class ServicesPage extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <div>
        <Container className={css.TriadContainer}>
          <div className={css.TriadWrapper}>
            <Row>
              <Col sm={12}>
                <TextSection
                  heading={post.title.rendered}
                  align="center"
                  alignContent="center"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </TextSection>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={4}>
                <Link href="/">
                  <a rel="noopener noreferrer">
                    <div className={css.TriadImageContainer}>
                      <div className={css.TriadImageWrapper}>
                        <div
                          className={css.TriadImage}
                          style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                        />
                      </div>
                      <div className={css.TriadImageLabelWrapper}>
                        <div className={css.TriadImageLabel}>
                        Lorem ipsum, dolor sit amet consectetur.
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </Col>

              <Col sm={12} md={4}>
                <div className={css.TriadImageContainer}>
                  <div className={css.TriadImageWrapper}>
                    <div
                      className={css.TriadImage}
                      style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                    />
                  </div>
                  <div className={css.TriadImageLabelWrapper}>
                    <div className={css.TriadImageLabel}>
                    Lorem ipsum, dolor sit amet consectetur.
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={12} md={4}>
                <div className={css.TriadImageContainer}>
                  <div className={css.TriadImageWrapper}>
                    <div
                      className={css.TriadImage}
                      style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                    />
                  </div>
                  <div className={css.TriadImageLabelWrapper}>
                    <div className={css.TriadImageLabel}>
                    Lorem ipsum, dolor sit amet consectetur.
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

ServicesPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ServicesPage;
