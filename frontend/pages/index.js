import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import TextSection from '../components/TextSection/TextSection';
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
    const { page, headerMenu, drawerMenu, footerMenu, baseMenu, classes } = this.props;

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
          <Grid container spacing={24} justify="center">
            <Grid container item xs={12} spacing={16}>
              <Grid item sm={12}>
                <TextSection
                  heading="Some Nice Section Title"
                  align="center"
                  alignContent="left"
                >
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores aliquam corporis vitae sed quia reiciendis distinctio, amet libero sapiente ipsam sunt veniam labore officia nemo odit soluta culpa deleniti?</p>
                </TextSection>
              </Grid>

              <Grid item sm={12} md={4}>
                <Paper className={css.paper}>sm=12 md=4</Paper>
              </Grid>
              <Grid item sm={12} md={4}>
                <Paper className={css.paper}>sm=12 md=4</Paper>
              </Grid>
              <Grid item sm={12} md={4}>
                <Paper className={css.paper}>sm=12 md=4</Paper>
              </Grid>
            </Grid>


            <Grid container item xs={12} spacing={16}>
              <Grid item sm={12} md={7}>
                <Paper className={css.paper}>IMG</Paper>
              </Grid>
              <Grid item sm={12} md={5}>
                <Paper className={css.paper}>TEXT</Paper>
              </Grid>
              <Grid item sm={12} md={5} order={2}>
                <Paper className={css.paper}>TEXT</Paper>
              </Grid>
              <Grid item sm={12} md={7} order={1}>
                <Paper className={css.paper}>IMG</Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>


        <Button variant="contained" color="primary">Unstyled Button</Button>
        <Button className={css.Button}>CSS Import Styled Button</Button>

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

export default withPageWrapper(withStyles(css)(Index));
