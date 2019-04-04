import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Column } from 'react-grid-system';
import ServicesPage from './PageComponents/ServicesPage/ServicesPage';
import ResidentialPage from './PageComponents/ResidentialPage/ResidentialPage';
import OurPurposePage from './PageComponents/OurPurposePage/OurPurposePage';
import MissionVisionPage from './PageComponents/MissionVisionPage/MissionVisionPage';


const PageLoader = props => {
  const { post } = props;
  console.log(post);

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
    residential: <ResidentialPage post={post} />,
    'our-purpose': <OurPurposePage post={post} />,
    'mission-and-vision': <MissionVisionPage post={post} />,
  };

  /**
   * Gets the component associated with a given slug.
   */
  const getSlugComponent = slug => {
    return componentSlugMap[slug];
  };

  // checks if a given slug has a mapped component in the ComponentSlugMap.
  const slugHasComponent = slug => {
    return Object.prototype.hasOwnProperty.call(componentSlugMap, slug);
  };


  // check if the slug has a component to load
  const hasComponent = slugHasComponent(post.slug);

  return (
    <Fragment>
      {/* If the page has a specified PageComponent, then load that component */}
      {hasComponent && getSlugComponent(post.slug)}

      {/* Otherwise, just load the default content */}
      {!hasComponent && (
        <Container>
          <Row>
            <h1>{post.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </Row>
        </Container>
      )}

    </Fragment>
  );
};


PageLoader.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PageLoader;
