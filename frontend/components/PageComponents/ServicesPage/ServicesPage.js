import { PureComponent } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import TextSection from '../../TextSection/TextSection';
import css from './ServicesPage.scss';

class ServicesPage extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <div className={css.PageWrapper}>
        <div className={css.PageLeadWrapper}>
          <h1 className={css.PageHeading}>{post.title.rendered}</h1>
          <div className={css.PageLead}>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>

          {/* <TextSection
            heading={post.title.rendered}
            align="center"
            alignContent="center"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </TextSection> */}
        </div>

        <div className="separator" />

        <Container className={css.TriadContainer}>
          <div className={css.TriadWrapper}>
            <Row>
              <Col sm={12} md={4}>
                <Link href="/residential">
                  <a rel="noopener noreferrer">
                    <div className={css.TriadImageContainer}>
                      <div className={css.TriadImageWrapper}>
                        <div
                          className={css.TriadImage}
                          style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                        />
                      </div>
                      <div className={css.TriadImageLabelWrapper}>
                        <div className={css.TriadImageLabel}>Residential</div>
                      </div>
                    </div>
                  </a>
                </Link>
              </Col>

              <Col sm={12} md={4}>
                <Link href="/community" as="/community">
                  <a rel="noopener noreferrer">
                    <div className={css.TriadImageContainer}>
                      <div className={css.TriadImageWrapper}>
                        <div
                          className={css.TriadImage}
                          style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                        />
                      </div>
                      <div className={css.TriadImageLabelWrapper}>
                        <div className={css.TriadImageLabel}>Community</div>
                      </div>
                    </div>
                  </a>
                </Link>
              </Col>

              <Col sm={12} md={4}>
                <Link href="/tenant-case-management">
                  <a rel="noopener noreferrer">
                    <div className={css.TriadImageContainer}>
                      <div className={css.TriadImageWrapper}>
                        <div
                          className={css.TriadImage}
                          style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                        />
                      </div>
                      <div className={css.TriadImageLabelWrapper}>
                        <div className={css.TriadImageLabel}>Tenant Case Management</div>
                      </div>
                    </div>
                  </a>
                </Link>
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
