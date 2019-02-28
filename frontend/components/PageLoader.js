import React from 'react';
import PropTypes from 'prop-types';
import ServicesPage from './PageComponents/ServicesPage';


const PageLoader = props => {
  const { post } = props;

  /**
   * This is a mapping of various page slugs to the components
   * that are used to display the contents for those pages. These
   * page components act as wrappers around all the various components
   * that may be used within a page itself. If a PageComponent has been
   * created for a page with the given slug, the the mapping of that
   * component will be listed in the componentSlugMap.
   */
  const componentSlugMap = {
    services: <ServicesPage post={post} />,
  };

  const getSlugComponent = slug => {
    return componentSlugMap[slug];
  };

  // checks if a given slug has a mapped component in the ComponentSlugMap.
  const slugHasComponent = slug => Object.prototype.hasOwnProperty.call(componentSlugMap, slug);

  return (
    <div>
      The page given is {post.title.rendered}

      {slugHasComponent(post.slug) && (
        <p>This slug has a component.</p>
      )}

      {/* {slugHasComponent(post.slug) && getSlugComponent(post.slug)} */}

      {!slugHasComponent(post.slug) && (
        <p>This slug does not have a component.</p>
      )}

    </div>
  );
};


PageLoader.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PageLoader;
