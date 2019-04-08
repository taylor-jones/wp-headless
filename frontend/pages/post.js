import { PureComponent } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PropTypes from 'prop-types';
import withPageWrapper from '../hoc/withPageWrapper';
import Layout from '../components/UI/Layout/Layout';
import HeroImage from '../components/UI/HeroImage/HeroImage';
import { Config } from '../config';
import PageLoader from '../components/PageLoader';


/**
 * Maps custom post type requests that may need to be made for
 * specific slugs. If the current post's slug is in this map,
 * then an additional fetch will be made to the specified fetchUrl,
 * and the additional fetched data will be appended to the returned
 * post object as the postProperty name from the mapping.
 */
const customPostTypeRequestMap = {
  services: {
    fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/services`,
    postProperty: 'services',
  },
  impact: {
    fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/stories`,
    postProperty: 'stories',
  },
};


/**
 * Checks if a custom post request mapping exists for a given slug
 * If so, the object from the customPostTypeRequestMap is returned.
 * Otherwise, the function returns false.
 *
 * @param { slug } - string - the slug to check for the existence
 *  of a key for in the customPostTypeRequestMap.
 */
const getMappedCustomPostTypeRequest = slug => {
  const hasMappedSlug = Object.prototype.hasOwnProperty.call(customPostTypeRequestMap, slug);
  return hasMappedSlug ? customPostTypeRequestMap[slug] : false;
};


class Post extends PureComponent {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const postRes = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`);
    const post = await postRes.json();

    /**
     * Check if there are any custom post type requests that need to
     * be made, based on the query slug. If so, fetch the custom post
     * data, and append it to the post object that is being returned.
     */
    const customPostRequest = getMappedCustomPostTypeRequest(slug);
    if (customPostRequest) {
      const customPostRes = await fetch(customPostRequest.fetchUrl);
      const customPost = await customPostRes.json();
      post[customPostRequest.postProperty] = customPost;
    }

    return { post };
  }

  render() {
    // console.log(this.props);
    const { post } = this.props;
    if (!post.title) return <Error statusCode={404} />;
    // Use post.slug to dynamically render different components where necessary.

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        baseMenu={this.props.baseMenu}
        title={post.title}
      >

        <HeroImage
          featuredImage={post.featured_image}
          title={post.title.rendered}
          dotted
        />

        <PageLoader post={post} />
      </Layout>
    );
  }
}


Post.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object).isRequired,
};

export default withPageWrapper(Post);
