/* eslint-disable camelcase */
import { PureComponent, Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { FiX } from 'react-icons/fi';
import { MdPlace } from 'react-icons/md';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import TextSection from '../../TextSection/TextSection';
import css from './ResidentialPage.scss';
import { getServicesByCategory } from '../../../lib/clientUtils';

const modalHtmlId = 'modal';

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
  modalElement = null;


  /**
   * Binds the modal to the 'body' element whenever
   * this component is loaded.
   */
  componentWillMount() {
    Modal.setAppElement('body');
  }


  componentDidMount() {
    this.modalElement = document.querySelector('modal');
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }


  /**
   * Sets the showModal state to false, which hides the modal.
   */
  closeServiceModal = () => {
    this.setState({ showModal: false });
    enableBodyScroll(this.modalElement);
  }


  /**
   * Updates the modalServiceId state using the serviceid of
   * whichever button was clicked to display service details.
   * Then, sets the showModal state to true, which allows the
   * modal to be displayed.
   */
  openServiceModal = service => {
    const serviceId = service.target.getAttribute('serviceid');
    this.setState({ modalServiceId: serviceId || 0, showModal: true });
    disableBodyScroll(this.modalElement);
  }


  /**
   * Retrieves the modal content for the current modalServiceId
   * and then returns the content of the modal to be rendered.
   */
  renderServiceModal = () => {
    const { showModal, modalServiceId } = this.state;
    if (!showModal || !modalServiceId) return null;

    const service = this.services[modalServiceId];
    if (!service) return null;

    const { acf } = service;
    console.log(acf);

    const { service_regions, service_categories, coverage_types, diagnosis_types } = acf;

    return (
      <Fragment>
        <div className={css.ModalHeading}>{service.title.rendered}
          <div className={css.ModalClose}>
            <button onClick={this.closeServiceModal} type="button"><FiX /></button>
          </div>
        </div>

        <div className={css.ModalBody}>
          {/* Show the service regions */}
          {service_regions.length > 0 && (
            <ul className={css.ModalTags}>
              {service_regions.map(region => {
                return (
                  <li key={region.term_id}>
                    <span><MdPlace /></span>
                    <span>{region.name}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Show the service details */}
          <div
            className={css.ModalContent}
            dangerouslySetInnerHTML={{ __html: service.content.rendered }}
          />
        </div>
      </Fragment>
    );
  }


  /**
   * Retrieves the formatted url for a specified service object
   * @param {object} service
   */
  getServiceImage = service => {
    // TODO: involve react-responsive-picture to load different images at different sizes.
    // for now, just load the default placeholder image.
    const imgSrc = '../static/images/placeholder-graphic.svg';

    return (
      <img
        className={css.BlockImage}
        src={imgSrc}
        alt="Placeholder"
      />
    );
  }


  render() {
    const { post } = this.props;
    post.services = getServicesByCategory(post.services, post.slug);
    // console.log(post);

    return (
      <div className={css.PageWrapper}>

        {/* Top Section -- Lead Content */}
        <Container>
          <Row>
            <Col sm={12}>
              <div className={css.LeadWrapper}>
                <TextSection>
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </TextSection>
              </div>
            </Col>
          </Row>
        </Container>


        {/* Services List */}
        {/* Remove wrapping <p> tags from the excerpt */}
        {post.services.map(service => {
          const excerpt = sanitizeHtml(service.excerpt.rendered, { allowedTags: [] });

          { /* Set the services object value for this service */ }
          this.services[service.id] = service;

          return (
            <div className={css.BlockWrapper} key={service.id}>
              <div className={css.BlockWrapperInner}>
                <div className={css.BlockImageWrapper}>
                  {this.getServiceImage(service)}
                </div>

                <div className={css.BlockTextWrapper}>
                  <div className={css.BlockTextWrapperInner}>
                    <div className={css.BlockHeadingWrapper}>
                      <div className={css.BlockHeading}>{service.title.rendered}</div>
                    </div>
                    <p className={css.BlockText}>{excerpt}</p>

                  </div>
                  <button
                    className={css.BlockButton}
                    type="button"
                    serviceid={service.id}
                    onClick={service ? this.openServiceModal.bind(this) : null}
                  >Show Details
                  </button>
                </div>
              </div>
            </div>

          );
        })}

        {/* Modal */}
        <div className={css.ModalWrapper} id={modalHtmlId}>
          <Modal
            className={css.Modal}
            overlayClassName={css.ModalOverlay}
            isOpen={this.state.showModal}
            onRequestClose={this.closeServiceModal}
          >
            {this.renderServiceModal()}
          </Modal>
        </div>
      </div>
    );
  }
}



ResidentialPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default ResidentialPage;
