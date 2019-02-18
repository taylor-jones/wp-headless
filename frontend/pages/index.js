import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Layout from '../components/UI/Layout/Layout';
import HeroImage from '../components/UI/HeroImage/HeroImage';
import withPageWrapper from '../hoc/withPageWrapper';
import { Config } from '../config';


class Index extends Component {
  static async getInitialProps(context) {
    const pageRes = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/page?slug=home`);
    const page = await pageRes.json();
    return { page };
  }

  render() {
    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        baseMenu={this.props.baseMenu}
        title={this.props.page.title}
      >
        <HeroImage />

        <h1>{this.props.page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.page.content.rendered }} />

      </Layout>
    );
  }
}


Index.defaultProps = {
  page: null,
};

Index.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.instanceOf(Object),
};

export default withPageWrapper(Index);
