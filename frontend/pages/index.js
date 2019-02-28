import { Component, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { Container, Row, Col } from 'react-grid-system';
import { FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import withPageWrapper from '../hoc/withPageWrapper';
import Layout from '../components/UI/Layout/Layout';
import HeroImage from '../components/UI/HeroImage/HeroImage';
import TextSection from '../components/TextSection/TextSection';
import { Config } from '../config';
import css from './index.scss';


class Index extends Component {
  static async getInitialProps(context) {
    const pageRes = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/page?slug=home`);
    const page = await pageRes.json();
    return { page };
  }

  state = {
    emailAddress: '',
    subscribeEnabled: false,
  }

  /**
   * Handles input changes to the email address input control.
   */
  handleEmailChange = event => {
    const hasInput = event.target.value.length > 0;
    this.setState({
      emailAddress: event.target.value,
      subscribeEnabled: hasInput,
    });
  }

  /**
   * Handles a submission of email address for subscription.
   */
  handleEmailAddressSubmission = event => {
    event.preventDefault();
    console.log(this.state);
    // TODO: Handle the backend stuff. Maybe a custom post type of Subscribers needs to be created?
  }


  render() {
    // console.log(this.props);
    const { page, headerMenu, drawerMenu, footerMenu, baseMenu } = this.props;
    const { acf } = page;

    return (
      <Layout
        headerMenu={headerMenu}
        drawerMenu={drawerMenu}
        footerMenu={footerMenu}
        baseMenu={baseMenu}
        title={page.title}
      >
        <HeroImage
          featuredImage={page.featured_image}
          title={page.title.rendered}
          dotted
          absolute
        />


        <div className={css.IndexWrapper}>
          <Container className={css.IndexContainer}>
            <div className={css.IndexWrapperInner}>
              <Row>
                <Col sm={12}>
                  <TextSection
                    heading={page.title.rendered}
                    align="center"
                    alignContent="center"
                  >
                    <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                    {/* <p>{page.content.rendered}</p> */}
                  </TextSection>
                </Col>
              </Row>

              <Row>
                <Col sm={12} md={4}>
                  <div className={css.ImageContainer}>
                    <div className={css.ImageWrapper}>
                      <div
                        className={css.Image}
                        style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                      />
                    </div>
                    <div className={css.ImageLabelWrapper}>
                      <div className={css.ImageLabel}>
                      Lorem ipsum, dolor sit amet consectetur.
                      </div>
                    </div>
                  </div>
                </Col>

                <Col sm={12} md={4}>
                  <div className={css.ImageContainer}>
                    <div className={css.ImageWrapper}>
                      <div
                        className={css.Image}
                        style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                      />
                    </div>
                    <div className={css.ImageLabelWrapper}>
                      <div className={css.ImageLabel}>
                      Lorem ipsum, dolor sit amet consectetur.
                      </div>
                    </div>
                  </div>
                </Col>

                <Col sm={12} md={4}>
                  <div className={css.ImageContainer}>
                    <div className={css.ImageWrapper}>
                      <div
                        className={css.Image}
                        style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                      />
                    </div>
                    <div className={css.ImageLabelWrapper}>
                      <div className={css.ImageLabel}>
                      Lorem ipsum, dolor sit amet consectetur.
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>


          <Container className={css.BlockContainer}>
            <div className={css.BlockWrapper}>
              <div className={css.BlockImageWrapper}>
                <div
                  className={css.BlockImage}
                  style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                />
              </div>

              <div className={css.BlockTextWrapper}>
                <div className={css.BlockText}>
                  <TextSection
                    heading="Section Heading"
                  >
                    Lorem ipsum dolor sit amet conse ctetur adipisi cing elit.
                    Minus minima aspernatur, error nihil doloribus aperiam.
                  </TextSection>
                </div>
              </div>
            </div>


            <div className={css.BlockWrapper}>
              <div className={css.BlockImageWrapper}>
                <div
                  className={css.BlockImage}
                  style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                />
              </div>

              <div className={[css.BlockTextWrapper, css.Offset].join(' ')}>
                <div className={css.BlockText}>
                  <TextSection
                    heading="Section Heading"
                  >
                    Lorem ipsum dolor sit amet conse ctetur adipisi cing elit.
                    Minus minima aspernatur, error nihil doloribus aperiam.
                  </TextSection>
                </div>
              </div>
            </div>


            <div className={css.BlockWrapper}>
              <div className={css.BlockImageWrapper}>
                <div
                  className={css.BlockImage}
                  style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
                />
              </div>

              <div className={css.BlockTextWrapper}>
                <div className={css.BlockText}>
                  <TextSection
                    heading="Section Heading"
                  >
                    Lorem ipsum dolor sit amet conse ctetur adipisi cing elit.
                    Minus minima aspernatur, error nihil doloribus aperiam.
                  </TextSection>
                </div>
              </div>
            </div>

          </Container>

        </div>
      </Layout>
    );
  }
}


Index.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.instanceOf(Object).isRequired,
};

export default withPageWrapper(Index);
