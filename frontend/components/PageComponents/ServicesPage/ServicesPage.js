/* eslint-disable camelcase */
import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { Container, Row, Col } from 'react-grid-system';
import { FiX } from 'react-icons/fi';
import { MdPlace } from 'react-icons/md';
import { GoCheck, GoCircleSlash, GoPrimitiveDot } from 'react-icons/go';
import Modal from 'react-modal';
import Link from 'next/link';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import TextSection from '../../TextSection/TextSection';
import css from './ServicesPage.scss';


/**
 * Gets all the taxonomy term ids for a given
 * array representing a service taxonomy type.
 * @param {array} array - an array of object, where each object has a term_id
 * @returns {array} an array of only term_ids
 */
const getTaxonomyTermIds = array => {
  return array.map(item => item.term_id);
};


const modalHtmlId = 'modal';

class ServicesPage extends PureComponent {
  state = {
    showModal: false,
    modalServiceId: null,
    serviceFilters: {
      categories: [],
      coverageTypes: [],
      diagnosisTypes: [],
      regions: [],
    },
    filteredServices: [],
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
  servicesArr = [];
  serviceOptions = null;
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
   * Service Filter Handlers
   */

  handleCategoryFilterChange = selection => {
    console.log('handleCategoryFilterChange', selection);

    this.setState(prev => ({
      serviceFilters: { ...prev.serviceFilters, categories: selection },
    }), () => {
      // do stuff with updated state
      console.log(this.state);
    });
  }

  handleCoverageFilterChange = selection => {
    // console.log('handleCoverageFilterChange', selection);

    this.setState(prev => ({
      serviceFilters: { ...prev.serviceFilters, coverageTypes: selection },
    }), () => {
      // do stuff with updated state
      console.log(this.state);
    });
  }

  handleDiagnosisFilterChange = selection => {
    // console.log('handleDiagnosisFilterChange', selection);

    this.setState(prev => ({
      serviceFilters: { ...prev.serviceFilters, diagnosisTypes: selection },
    }), () => {
      // do stuff with updated state
      console.log(this.state);
    });
  }

  handleRegionFilterChange = selection => {
    // console.log('handleRegionFilterChange', selection);

    this.setState(prev => ({
      serviceFilters: { ...prev.serviceFilters, regions: selection },
    }), () => {
      // do stuff with updated state
      console.log(this.state);
    });
  }

  /**
   * Use the contents of the service filters to determine which of the
   * services should be actively displayed on the page.
   */
  updateDisplayedServicesFromFilters = () => {
    // TODO:
  }



  /**
   * Modal Handlers
   */

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
        <div className={css.ModalTitle}>{service.title.rendered}
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
              <div className={css.ModalHeading}>Description</div>
              <div dangerouslySetInnerHTML={{ __html: description }} />

              {/* URL */}
              {url && (
                <p className={css.ModalUrl}>For more details, see
                  <Link href={url}>
                    <a target="_blank" rel="noopener noreferrer"> the service description from the North Carolina Department of Health and Human Services.</a>
                  </Link>
                </p>
              )}
            </div>

            {/* Key Facts */}
            {key_facts && (
              <div className={css.ModalSection}>
                <div className={css.ModalHeading}>What To Know</div>
                <ul className={css.ModalList}>
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
                <div className={css.ModalHeading}>What This Service Includes</div>
                <ul className={css.ModalList}>
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
                <div className={css.ModalHeading}>What This Service Does Not Include</div>
                <ul className={css.ModalList}>
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
        className={css.ServiceImage}
        src={imgSrc}
        alt="Placeholder"
      />
    );
  }


  getServiceFilterOptions = post => {
    const serviceOptions = {
      categories: post.service_categories ? post.service_categories.map(category => {
        return { value: category.id, label: category.name };
      }) : [],

      coverageTypes: post.service_coverage_types ? post.service_coverage_types.map(type => {
        return { value: type.id, label: type.name };
      }) : [],

      diagnosisTypes: post.service_diagnosis_types ? post.service_diagnosis_types.map(type => {
        return { value: type.id, label: type.name };
      }) : [],

      regions: post.service_regions ? post.service_regions.map(region => {
        return { value: region.id, label: region.name };
      }) : [],
    };

    return serviceOptions;
  }


  render() {
    const { post } = this.props;
    console.log('ServicesPage RENDER');
    // console.log(post);

    // Cache the services object and array,
    // if they aren't already setup. These are unfiltered
    if (!this.services || !this.servicesArr.length) {
      console.log('setting up initial services object and array');
      post.services.forEach(service => {
        this.services[service.id] = service;
        this.servicesArr.push(service);
      });
    }

    // Cache the service filtering options if they aren't already setup.
    if (!this.serviceOptions) {
      console.log('setting up service filter options');
      this.serviceOptions = this.getServiceFilterOptions(post);
    }

    console.log(this.services);
    console.log(this.servicesArr);
    console.log(this.serviceOptions);


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


        {/* Service Select Filters */}
        <div className={css.ServiceFiltersWrapper}>
          <div className={css.ServiceFilters}>
            {/* Service Categories */}
            {this.serviceOptions.categories.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Categories</div>
                <Select
                  options={this.serviceOptions.categories}
                  closeMenuOnScroll={() => true}
                  onChange={this.handleCategoryFilterChange}
                  isMulti
                />
              </div>
            )}

            {/* Service Coverage Types */}
            {this.serviceOptions.coverageTypes.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Coverage Types</div>
                <Select
                  options={this.serviceOptions.coverageTypes}
                  closeMenuOnScroll={() => true}
                  onChange={this.handleCoverageFilterChange}
                  isMulti
                />
              </div>
            )}

            {/* Service Diagnosis Types */}
            {this.serviceOptions.diagnosisTypes.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Diagnosis Types</div>
                <Select
                  options={this.serviceOptions.diagnosisTypes}
                  closeMenuOnScroll={() => true}
                  onChange={this.handleDiagnosisFilterChange}
                  isMulti
                />
              </div>
            )}

            {/* Service Regions */}
            {this.serviceOptions.regions.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Regions</div>
                <Select
                  options={this.serviceOptions.regions}
                  closeMenuOnScroll={() => true}
                  onChange={this.handleRegionFilterChange}
                  isMulti
                />
              </div>
            )}
          </div>
        </div>


        {/* Service Cards */}
        <div className={css.ServiceCardsContainer}>
          <div className={css.ServiceCardsWrapper}>
            <div className={css.ServiceCards}>

              {post.services.map(service => {
                const excerpt = sanitizeHtml(service.excerpt.rendered, { allowedTags: [] });

                { /* Set the services object value for this service */ }
                { /* this.services[service.id] = service; */ }
                const { acf } = service;

                return (
                  <div
                    key={service.id}
                    className={css.ServiceCardWrapper}
                    coverage-types={getTaxonomyTermIds(acf.coverage_types)}
                    diagnosis-types={getTaxonomyTermIds(acf.diagnosis_types)}
                    regions={getTaxonomyTermIds(acf.service_regions)}
                    categories={getTaxonomyTermIds(acf.service_categories)}
                  >
                    <div className={css.ServiceCard}>
                      <div className={css.ServiceCardHead}>
                        <div className={css.ServiceCardImage}>
                          {this.getServiceImage(service)}
                        </div>
                      </div>

                      <div className={css.ServiceCardBody}>
                        <div className={css.ServiceBodyContent}>
                          <div className={css.ServiceCardHeading}>
                            {service.title.rendered}
                          </div>

                          <div className={css.ServiceCardExcerpt}>{excerpt}</div>
                        </div>

                        <button
                          type="button"
                          className={css.ServiceCardButton}
                          serviceid={service.id}
                          onClick={service ? this.openServiceModal.bind(this) : null}
                        >Show Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>


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



ServicesPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default ServicesPage;
