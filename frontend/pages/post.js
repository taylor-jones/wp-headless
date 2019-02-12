import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import { Config } from '../config';

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`);
    const post = await res.json();
    return { post };
  }

  render() {
    if (!this.props.post.title) return <Error statusCode={404} />;

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        title={this.props.post.title}
      >
        <h1>{this.props.post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.content.rendered }} />
      </Layout>
    );
  }
}


Post.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object).isRequired,
};

export default PageWrapper(Post);
