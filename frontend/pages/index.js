import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import { ShowAt } from 'react-with-breakpoints';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import withPageWrapper from '../hoc/withPageWrapper';
import Layout from '../components/UI/Layout/Layout';
import HeroImage from '../components/UI/HeroImage/HeroImage';
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

        <Container className={css.Container}>
          <Button>Unstyled Button</Button>
          <Button className={css.Button}>My Button</Button>
        </Container>

        <h1>{this.props.page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.page.content.rendered }} />

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
