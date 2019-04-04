/* eslint-disable camelcase */
import { PureComponent, Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { FiX } from 'react-icons/fi';
import { MdPlace } from 'react-icons/md';
import { GoLightBulb, GoCheck, GoCircleSlash, GoPrimitiveDot } from 'react-icons/go';
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
    console.log(service);

    const {
      service_regions,
      service_categories,
      coverage_types,
      diagnosis_types,
      image,
      description,
      url,
      key_facts,
      inclusions,
      exclusions,
    } = acf;

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

          {/* Show the service content */}
          <div className={css.ModalContent}>

            {/* Description */}
            <div className={css.ModalSection}>
              <h3>Description</h3>
              <div dangerouslySetInnerHTML={{ __html: description }} />

              {/* URL */}
              {url && (
                <p>For more details, see <a target="_blank" rel="noopener noreferrer" href={url}>the service description from the North Carolina Department of Health and Human Services.</a></p>
              )}
            </div>

            {/* Key Facts */}
            {key_facts && (
              <div className={css.ModalSection}>
                <h3>What To Know</h3>
                <ul>
                  {key_facts.map((item, index) => {
                    return (
                      <li key={index}>
                        <span><GoPrimitiveDot /></span>
                        <div>{item.fact}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Inclusions */}
            {inclusions && (
              <div className={css.ModalSection}>
                <h3>What This Service Includes</h3>
                <ul>
                  {inclusions.map((item, index) => {
                    return (
                      <li key={index}>
                        <span><GoCheck /></span>
                        <div>{item.inclusion}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {exclusions && (
              <div className={css.ModalSection}>
                <h3>What This Service Does Not Include</h3>
                <ul>
                  {exclusions.map((item, index) => {
                    return (
                      <li key={index}>
                        <span><GoCircleSlash /></span>
                        <div>{item.exclusion}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

          </div>
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
    // post.services = getServicesByCategory(post.services, post.slug);
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
