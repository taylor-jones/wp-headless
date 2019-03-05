import { PureComponent } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import TextSection from '../../TextSection/TextSection';
import css from './ResidentialPage.scss';
import { getServicesByCategory } from '../../../lib/clientUtils';



class ResidentialPage extends PureComponent {
  state = {
    showModal: false,
    modalServiceId: null,
  };

  /**
   * When each service is rendered, it stores itself in this
   * object using the service's key at the map key and the service's
   * details as the map value. The button that is clicked to show the details
   * has been given a serviceid attribute. This serviceid is passed to the
   * modalServiceId kept in the component state, which keeps track of the
   * current service details being viewed. Then, the appropriate content
   * is retrieved from the services object that corresponds to the
   * clicked service details, and that content is displayed in the modal.
   */
  services = {};

  /**
   * Binds the modal to the 'body' element whenever
   * this component is loaded.
   */
  componentWillMount() {
    Modal.setAppElement('body');
  }

  /**
   * Sets the showModal state to false, which hides the modal.
   */
  closeModal = () => {
    this.setState({ showModal: false });
  }

  /**
   * Updates the modalServiceId state using the serviceid of
   * whichever button was clicked to display service details.
   * Then, sets the showModal state to true, which allows the
   * modal to be displayed.
   */
  handleServiceClick = service => {
    const serviceId = service.target.getAttribute('serviceid');
    this.setState({
      modalServiceId: serviceId || 0,
      showModal: true,
    });
  }

  /**
   * Retrieves the modal content for the current modalServiceId
   * and then returns the content of the modal to be rendered.
   */
  renderModal = () => {
    const { showModal, modalServiceId } = this.state;
    if (!showModal || !modalServiceId) return null;

    const service = this.services[modalServiceId];
    if (!service) return null;

    return (
      <div className={css.ModalContent}>
        <div dangerouslySetInnerHTML={{ __html: service.content.rendered }} />
      </div>
    );
  }

  /**
   * Retrieves the formatted url for a specified service object
   * @param {object} service
   */
  getServiceImage = service => {
    // TODO: involve react-responsive-picture to load different images at different sizes.
    // for now, just load the default placeholder image.
    return (
      <div
        className={css.BlockImage}
        style={{ backgroundImage: 'url("../static/images/Placeholder.png")' }}
      />
    );
  }


  render() {
    const { post } = this.props;
    // console.log(post);
    post.services = getServicesByCategory(post.services, post.slug);

    return (
      <div className={css.PageWrapper}>

        {/* Top Section -- Lead Content */}
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


        {/* Services List */}
        <Container className={css.BlockContainer}>
          {/* Remove wrapping <p> tags from the excerpt */}
          {post.services.map(service => {
            console.log(service);
            const strippedExcerpt = sanitizeHtml(service.excerpt.rendered, { allowedTags: [] });

            { /* Set the services value for this service */ }
            this.services[service.id] = service;

            return (
              <div className={css.BlockWrapper} key={service.id}>
                <div className={css.BlockImageWrapper}>
                  {this.getServiceImage(service)}
                </div>

                <div className={css.BlockTextWrapper}>
                  <div className={css.BlockTextWrapperInner}>
                    <div className={css.BlockHeadingWrapper}>
                      <div className={css.BlockHeading}>{service.title.rendered}</div>
                    </div>
                    <div className={css.BlockText}>
                      {strippedExcerpt}
                    </div>
                    <button
                      type="button"
                      serviceid={service.id}
                      onClick={service ? this.handleServiceClick.bind(this) : null}
                    >Show Details</button>
                  </div>
                </div>
              </div>
            );
          })}
        </Container>

        {/* Modal */}
        <div className={css.ModalFrame}>
          <div className={css.ModalWrapper}>
            <Modal
              className={css.Modal}
              overlayClassName={css.ModalOverlay}
              isOpen={this.state.showModal}
              onRequestClose={this.closeModal}
            >
              {this.renderModal()}
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

ResidentialPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResidentialPage;
