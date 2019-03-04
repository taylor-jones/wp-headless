import { PureComponent } from 'react';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import { Accordion, AccordionItem } from 'react-sanfona';
import PropTypes from 'prop-types';
import TextSection from '../../TextSection/TextSection';
import css from './ResidentialPage.scss';
import { getServicesByCategory } from '../../../lib/serviceUtils';


class ResidentialPage extends PureComponent {
  render() {
    console.log(this.props);

    const { post } = this.props;
    const services = getServicesByCategory(post.services, post.slug);

    resetIdCounter();

    return (
      <div>
        <Container>
          <Row>
            <Col sm={12}>
              <div className={css.LeadWrapper}>
                <TextSection
                  heading={post.title.rendered}
                  align="center"
                  alignContent="left"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </TextSection>
              </div>
            </Col>
          </Row>
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
                <div className={css.BlockHeadingWrapper}>
                  <div className={css.BlockHeading}>Personal Assistance</div>
                </div>

                <div className={css.TabsWrapper}>
                  <Tabs
                    className={css.Tabs}
                    selectedTabClassName={css.Tab__Selected}
                    selectedTabPanelClassName={css.TabPanel__Selected}
                  >
                    <TabList className={css.TabList}>
                      <Tab className={css.Tab}>Description</Tab>
                      <Tab className={css.Tab}>Inclusions</Tab>
                      <Tab className={css.Tab}>Limitations</Tab>
                    </TabList>

                    <TabPanel>
                      <p>Personal Assistance is a support service which provides aid to a participant so that the participant can engage in activities and interactions from which the participant would otherwise be limited or excluded because of his or her disability or disabilities.</p>
                    </TabPanel>
                    <TabPanel>
                      <ul>
                        <li><p>Assistance in personal or regular living activities in the participant&apos;s home.</p></li>
                        <li><p>Support in skill development.</p></li>
                        <li><p>Support and accompaniment of the participant in regular community activities or in specialized treatment, habilitation or rehabilitation service programs.</p></li>
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum velit, ea a voluptates iusto corporis beatae totam suscipit dolores nam laborum corrupti eveniet molestiae placeat rerum maiores optio quos doloribus!</p>
                    </TabPanel>
                  </Tabs>
                </div>

                <div className={css.AccordionWrapper}>
                  <Accordion className={css.Accordion}>
                    <AccordionItem
                      className={css.AccordionItem}
                      titleClassName={css.AccordionItemTitle}
                      expandedClassName={css.AccordionItemExpanded}
                      bodyClassName={css.AccordionItemBody}
                      title="Description"
                    >
                      <p>Personal Assistance is a support service which provides aid to a participant so that the participant can engage in activities and interactions from which the participant would otherwise be limited or excluded because of his or her disability or disabilities.</p>
                    </AccordionItem>
                    <AccordionItem
                      className={css.AccordionItem}
                      titleClassName={css.AccordionItemTitle}
                      expandedClassName={css.AccordionItemExpanded}
                      bodyClassName={css.AccordionItemBody}
                      title="Inclusions"
                    >
                      <ul>
                        <li><p>Assistance in personal or regular living activities in the participant&apos;s home.</p></li>
                        <li><p>Support in skill development.</p></li>
                        <li><p>Support and accompaniment of the participant in regular community activities or in specialized treatment, habilitation or rehabilitation service programs.</p></li>
                      </ul>
                    </AccordionItem>
                    <AccordionItem
                      className={css.AccordionItem}
                      titleClassName={css.AccordionItemTitle}
                      expandedClassName={css.AccordionItemExpanded}
                      bodyClassName={css.AccordionItemBody}
                      title="Limitations"
                    >
                      <div>Baz</div>
                    </AccordionItem>
                  </Accordion>
                </div>

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
                <div className={css.BlockHeadingWrapper}>
                  <div className={css.BlockHeading}>Alternative Family Living</div>
                </div>
                <div className={css.TabsWrapper}>
                  <Tabs
                    className={css.Tabs}
                    selectedTabClassName={css.Tab__Selected}
                    selectedTabPanelClassName={css.TabPanel__Selected}
                  >
                    <TabList className={css.TabList}>
                      <Tab className={css.Tab}>Description</Tab>
                      <Tab className={css.Tab}>Inclusions</Tab>
                      <Tab className={css.Tab}>Limitations</Tab>
                    </TabList>

                    <TabPanel>
                      <p>Alternative Family Living (AFL) homes provide assistance with acquisition, retention, or improvement in skills related to activities of daily living, such as personal grooming and cleanliness, bed making and household chores, eating and the preparation of food, and the social and adaptive skills necessary to enable the participant to reside in a non-institutional setting.</p>
                      <p>The AFL services are provided under a contract or agreement to provide a home for a participant regardless of any discriminatory factors. These placements tend to be long-term in nature. Habilitation, training, and instruction are coupled with elements of support, supervision, and engaging participation to reflect the natural flow of training, practice of skills, and other activities as they occur during the course of the participant’s day.</p>
                      <p>This service is distinctive in that it includes habilitation and training activities, as well as care and assistance with activities of daily living when the individual is dependent on others to ensure health and safety. Interactions with the person are designed to achieve outcomes identified in the person centered plan. Support and supervision of the person’s activities to sustain skills gained through habilitation and training is also an acceptable goal of the AFL model.</p>
                      <p>AFL’s are designed to serve residents in a licensed home for 2 or 3 residents or for one resident in an unlicensed home. AFL providers have 24 hours a day, 7 days a week responsibility for the individual served and are thus responsible for supervision and support of the participant when not in other services.</p>
                    </TabPanel>
                    <TabPanel>
                      <ul>
                        <li>Assistance in personal or regular living activities in the participant&apos;s home.</li>
                        <li>Support in skill development.</li>
                        <li>Support and accompaniment of the participant in regular community activities or in specialized treatment, habilitation or rehabilitation service programs.</li>
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum velit, ea a voluptates iusto corporis beatae totam suscipit dolores nam laborum corrupti eveniet molestiae placeat rerum maiores optio quos doloribus!</p>
                    </TabPanel>
                  </Tabs>
                </div>
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
                <div className={css.BlockHeadingWrapper}>
                  <div className={css.BlockHeading}>Personal Care</div>
                </div>
                <div className={css.TabsWrapper}>
                  <Tabs
                    className={css.Tabs}
                    selectedTabClassName={css.Tab__Selected}
                    selectedTabPanelClassName={css.TabPanel__Selected}
                  >
                    <TabList className={css.TabList}>
                      <Tab className={css.Tab}>Description</Tab>
                      <Tab className={css.Tab}>Inclusions</Tab>
                      <Tab className={css.Tab}>Limitations</Tab>
                    </TabList>

                    <TabPanel>
                      <p>Personal Assistance is a support service which provides aid to a participant so that the participant can engage in activities and interactions from which the participant would otherwise be limited or excluded because of his or her disability or disabilities.</p>
                    </TabPanel>
                    <TabPanel>
                      <ul>
                        <li>Assistance in personal or regular living activities in the participant&apos;s home.</li>
                        <li>Support in skill development.</li>
                        <li>Support and accompaniment of the participant in regular community activities or in specialized treatment, habilitation or rehabilitation service programs.</li>
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum velit, ea a voluptates iusto corporis beatae totam suscipit dolores nam laborum corrupti eveniet molestiae placeat rerum maiores optio quos doloribus!</p>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

ResidentialPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResidentialPage;
