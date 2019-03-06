import { PureComponent } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import withPageWrapper from '../hoc/withPageWrapper';
import Layout from '../components/UI/Layout/Layout';
import HeroImage from '../components/UI/HeroImage/HeroImage';
import TextSection from '../components/TextSection/TextSection';
import { Config } from '../config';
import css from './index.scss';


class Index extends PureComponent {
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
          <Container className={css.TriadContainer}>
            <div className={css.TriadWrapper}>
              <Row>
                <Col xs={12}>
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
                <Col xs={12} md={4}>
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

                <Col xs={12} md={4}>
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

                <Col xs={12} md={4}>
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
                    link={{ url: '/', text: 'Foo Bar Baz' }}
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

              <div className={[css.BlockTextWrapper, css.Inverse].join(' ')}>
                <div className={css.BlockText}>
                  <TextSection heading="Section Heading">
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
                  <TextSection heading="Section Heading">
                    Lorem ipsum dolor sit amet conse ctetur adipisi cing elit.
                    Minus minima aspernatur, error nihil doloribus aperiam.
                  </TextSection>
                </div>
              </div>
            </div>

          </Container>

          <Container fluid>
            <div className={css.SubscribeContainer}>
              <div className={css.SubscribeWrapper}>
                <div className={css.SubscribeHeading}>Want to stay informed?</div>
                <div className={css.SubscribeFormWrapper}>

                  <form className={css.SubscribeForm}>
                    <div className={css.SubscribeInputWrapper}>
                      <label htmlFor="email">
                        <input
                          className={css.SubscribeInput}
                          type="email"
                          name="email"
                          id="email"
                          value={this.state.emailAddress}
                          onChange={this.handleEmailChange}
                        />
                      </label>
                    </div>

                    <div className={css.SubscribeInputSubmitWrapper}>
                      <button
                        type="submit"
                        className={css.SubscribeInputSubmit}
                        disabled={!this.state.subscribeEnabled}
                        onClick={this.handleEmailSubmission}
                      >Subscribe</button>
                    </div>
                  </form>

                  <div className={css.SubscribeFooterWrapper}>
                    <div className={css.SubscribeFooter}>
                      We&apos;ll never spam you or give out your email address to anyone,
                      and you can unsubscribe anytime.
                    </div>
                  </div>
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
