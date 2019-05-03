/* eslint-disable camelcase */

import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import PageLead from './PageLead/PageLead';
import AdvocatePage from './PageComponents/AdvocatePage/AdvocatePage';
import CareersPage from './PageComponents/CareersPage/CareersPage';
import DonatePage from './PageComponents/DonatePage/DonatePage';
import ImpactPage from './PageComponents/ImpactPage/ImpactPage';
import MissionPage from './PageComponents/MissionPage/MissionPage';
import OverviewPage from './PageComponents/OverviewPage/OverviewPage';
import PeoplePage from './PageComponents/PeoplePage/PeoplePage';
import PurposePage from './PageComponents/PurposePage/PurposePage';
import ServicesPage from './PageComponents/ServicesPage/ServicesPage';
import VolunteerPage from './PageComponents/VolunteerPage/VolunteerPage';
import WhoWeServePage from './PageComponents/WhoWeServePage/WhoWeServePage';


const PageLoader = props => {
  const { post } = props;
  // console.log(post);

  /**
   * This is a mapping of various page slugs to the components
   * that are used to display the contents for those pages. These
   * page components act as wrappers around all the various components
   * that may be used within a page itself. If a PageComponent has been
   * created for a page with the given slug, the the mapping of that
   * component will be listed in the componentSlugMap.
   */
  const componentSlugMap = {
    advisors: <PeoplePage post={post} />,
    advocate: <AdvocatePage post={post} />,
    careers: <CareersPage post={post} />,
    donate: <DonatePage post={post} />,
    'get-involved': <OverviewPage post={post} />,
    impact: <ImpactPage post={post} />,
    leadership: <PeoplePage post={post} />,
    mission: <MissionPage post={post} />,
    purpose: <PurposePage post={post} />,
    resources: <OverviewPage post={post} />,
    services: <ServicesPage post={post} />,
    volunteer: <VolunteerPage post={post} />,
    'what-we-do': <OverviewPage post={post} />,
    'who-we-serve': <WhoWeServePage post={post} />,
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

  // check if the slug has any page lead content
  const hasLeadContent = () => {
    if (!post.acf || !post.acf.page_lead) return false;
    const { page_lead } = post.acf;
    if (page_lead.heading || page_lead.sub_heading || page_lead.lead_content) return true;
    return false;
  };


  return (
    <Fragment>
      {/* If the page has any lead content, then load that above any other content */}
      {hasLeadContent() && (
        <PageLead
          align="center"
          heading={post.acf.page_lead.heading}
          subheading={post.acf.page_lead.sub_heading}
        >
          {post.acf.page_lead.lead_content}
        </PageLead>
      )}

      {/* If the page has a specified PageComponent, then load that component */}
      {hasComponent && getSlugComponent(post.slug)}

      {/* Otherwise, just load the default content */}
      {!hasComponent && (
        <Container className="visualizer">
          <Row>
            <Col>
              <h1>{post.title.rendered}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </Col>
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
