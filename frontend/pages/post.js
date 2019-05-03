import { PureComponent } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PropTypes from 'prop-types';
import withPageWrapper from '../hoc/withPageWrapper';
import Layout from '../components/UI/Layout/Layout';
import HeroImage from '../components/UI/HeroImage/HeroImage';
import PageLoader from '../components/PageLoader';
import { Config } from '../config';

/**
 * Maps custom post type requests that may need to be made for
 * specific slugs. If the current post's slug is in this map,
 * then an additional fetch will be made to the specified fetchUrl,
 * and the additional fetched data will be appended to the returned
 * post object as the postProperty name from the mapping.
 */
const customPostTypeRequestsMap = {
  services: [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/services`,
      postProperty: 'services',
    },
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/service-category`,
      postProperty: 'service_categories',
    },
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/service-coverage-type`,
      postProperty: 'service_coverage_types',
    },
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/service-diagnosis-type`,
      postProperty: 'service_diagnosis_types',
    },
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/service-region`,
      postProperty: 'service_regions',
    },
  ],
  impact: [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/stories`,
      postProperty: 'stories',
    },
  ],
  leadership: [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/leadership`,
      postProperty: 'people',
    },
  ],
  advisors: [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/advisors`,
      postProperty: 'people',
    },
  ],
  careers: [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/opportunities`,
      postProperty: 'opportunities',
    },
  ],
  volunteer: [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/wp/v2/opportunities`,
      postProperty: 'opportunities',
    },
  ],
  'what-we-do': [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/menus/v1/subnav/what-we-do`,
      postProperty: 'subnav',
    },
  ],
  'get-involved': [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/menus/v1/subnav/get-involved`,
      postProperty: 'subnav',
    },
  ],
  resources: [
    {
      fetchUrl: `${Config.apiUrl}/wp-json/menus/v1/subnav/resources`,
      postProperty: 'subnav',
    },
  ],
};


/**
 * Checks if a slug has mapped custom post request(s).
 * If so, the associated array from the customPostTypeRequestsMap
 * is returned. Otherwise, the function returns false.
 *
 * @param {slug} - string - the slug to check for the existence of
 *  a key for in the customPostTypeRequestMap.
 * @returns {array} an array of custom request objects from the
 *  customPostTypeRequestsMap (if found) or an empty array if no mapping exists.
 */
const getMappedCustomPostTypeRequests = slug => {
  const hasMappedSlug = Object.prototype.hasOwnProperty.call(customPostTypeRequestsMap, slug);
  return hasMappedSlug ? customPostTypeRequestsMap[slug] : [];
};


class Post extends PureComponent {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const postRes = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`);
    const post = await postRes.json();

    /**
     * Check if there are any custom post type requests that need to be made,
     * based on the query slug. If so, fetch the custom post data, and append
     * the results of the requests to the post object that is being returned.
     */
    const customPostRequests = getMappedCustomPostTypeRequests(slug);

    const getRequest = async req => {
      const customPostRes = await fetch(req.fetchUrl);
      const customPost = await customPostRes.json();
      post[req.postProperty] = customPost;
    };

    await customPostRequests.reduce(async (prevPromise, i) => {
      await prevPromise;
      return getRequest(i);
    }, Promise.resolve());


    // await Promise.all(customPostRequests.map(async (request) => {
    //   const customPostRes = await fetch(request.fetchUrl);
    //   const customPost = await customPostRes.json();
    //   post[request.postProperty] = customPost;
    // }));

    return { post };
  }

  render() {
    const { post } = this.props;
    if (!post.title) return <Error statusCode={404} />;

    // console.log(post);

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        baseMenu={this.props.baseMenu}
        title={post.title}
      >
        <HeroImage featuredImage={post.featured_image} title={post.title.rendered} dotted />
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
