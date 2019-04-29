/* eslint-disable camelcase */
import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { FiX } from 'react-icons/fi';
import { MdPlace } from 'react-icons/md';
import { GoCheck, GoCircleSlash, GoPrimitiveDot } from 'react-icons/go';
import Modal from 'react-modal';
import Link from 'next/link';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import css from './ServicesPage.scss';



/**
 * Checks if an object has a property with a specified name that satisfied all of:
 * - the property exists on the object
 * - the object property is an array
 * - the array is not empty
 *
 * @param {object} obj - the object to inspect within
 * @param {string} prop - the name of the object property that should be
 *    a non-empty array property on the object
 * @returns {boolean} true if all requirements above are met, false if not.
 */
const hasArrayProperty = (obj, prop) => typeof obj === 'object' && Array.isArray(obj[prop]) && obj[prop].length;


/**
 * Checks for an intersection of a property value between the object that contains
 * all the current service filters and a given service object.
 *
 * @note The function assumes that filters[property] and service[property] are both arrays.
 * @param {object} filters - an object that contains properties representing the
 *    different service filters that may be applied to the services.
 * @param {object} service - an object containing (at least) properties that are
 *    equivalent to the properties on the filters object.
 * @param {string} property - the name of a property to check for an intersection in.
 * @returns {boolean} true if the service[property] array has one of the values from the
 *    filters[property] array (or if the filters[property] array is empty, which means there
 *    is no active filter). False if not.
 */
const hasServiceProperty = (filters, service, property) => {
  return hasArrayProperty(filters, property)
    ? filters[property].some(id => service[property].some(prop => prop.term_id === id.value))
    : true;
};


/**
 * Filters an array of services to only those that have a matching property
 * value for all precified filters that are present in a filters object.
 * The function iterates over each key in the filters object, since each key
 * represents the name of a filter.
 *
 * @note each property of the filters object is an array
 * @note any empty array in the filters object represents a filter that is not set,
 *    so that particular property will not filter any services.
 *
 * @param {object} filters - the object that contains all the filtering properties
 * @param {array} services - an array of service objects to filter
 * @returns {array} an array of filtered service objects based on the contents
 *    of the filters object
 */
const getFilteredServices = (filters, services) => {
  Object.keys(filters).forEach(key => {
    services = services.filter(service => hasServiceProperty(filters, service.acf, key));
  });

  // sort the filtered services alphabetically before returning
  return services.sort((a, b) => (a.title.rendered > b.title.rendered ? 1 : -1));
};



class ServicesPage extends PureComponent {
  state = {
    showModal: false,
    modalServiceId: null,
    serviceFilters: {
      service_categories: [],
      coverage_types: [],
      diagnosis_types: [],
      service_regions: [],
    },
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
  modalHtmlId = 'modal';


  /**
   * Binds the modal to the 'body' element whenever
   * this component is loaded.
   */
  componentWillMount() {
    Modal.setAppElement('body');
  }

  /**
   * Sets the modal element so the modal
   * knows which elemet to use for rendering.
   */
  componentDidMount() {
    this.modalElement = document.querySelector('modal');
  }

  /**
   * Releases any scroll locks placed on the body
   */
  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }


  /**
   * Sets the showModal state to false, which hides the modal
   * and releases any body scroll locks.
   */
  closeServiceModal = () => {
    this.setState({ showModal: false });
    enableBodyScroll(this.modalElement);
  }


  /**
   * Handles a service filter change by updating the property of the
   * state.serviceFilter that is associated with the name of the element
   * that the change occurred on.
   */
  handleServiceFilterChange = (selection, meta) => {
    this.setState(prev => ({
      serviceFilters: { ...prev.serviceFilters, [meta.name]: selection },
    }));
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
    // console.log(service);

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
    const { acf } = service;
    const img = {
      src: acf.image ? acf.image.url : '../static/images/placeholder-graphic.svg',
      alt: acf.image ? acf.image.alt : 'Placholder',
    };

    return (
      <img
        className={css.ServiceImage}
        src={img.src}
        alt={img.alt}
      />
    );
  }


  /**
   * Creates and returns an object containing all the options to
   * display inside of each of the service filters.
   * @param {object} post - the post object passed to this component
   * @returns {object}
   */
  getServiceFilterOptions = post => {
    return {
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
  }



  render() {
    const { post } = this.props;
    const filteredServices = getFilteredServices(this.state.serviceFilters, post.services);
    const serviceOptions = this.getServiceFilterOptions(post);


    return (
      <div className={css.PageWrapper}>

        {/* Service Select Filters */}
        <div className={css.ServiceFiltersWrapper}>
          <div className={css.ServiceFilters}>
            {/* Service Categories */}
            {serviceOptions.categories.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Categories</div>
                <Select
                  instanceId="categories"
                  name="service_categories"
                  options={serviceOptions.categories}
                  closeMenuOnScroll={() => true}
                  onChange={(option, meta) => this.handleServiceFilterChange(option, meta)}
                  isMulti
                />
              </div>
            )}

            {/* Service Coverage Types */}
            {serviceOptions.coverageTypes.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Coverage Types</div>
                <Select
                  instanceId="coverage-types"
                  name="coverage_types"
                  options={serviceOptions.coverageTypes}
                  closeMenuOnScroll={() => true}
                  onChange={(option, meta) => this.handleServiceFilterChange(option, meta)}
                  isMulti
                />
              </div>
            )}

            {/* Service Diagnosis Types */}
            {serviceOptions.diagnosisTypes.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Diagnosis Types</div>
                <Select
                  instanceId="diagnosis-types"
                  name="diagnosis_types"
                  options={serviceOptions.diagnosisTypes}
                  closeMenuOnScroll={() => true}
                  onChange={(option, meta) => this.handleServiceFilterChange(option, meta)}
                  isMulti
                />
              </div>
            )}

            {/* Service Regions */}
            {serviceOptions.regions.length && (
              <div className={css.ServiceFilter}>
                <div className={css.ServiceFilterHeading}>Regions</div>
                <Select
                  instanceId="regions"
                  name="service_regions"
                  options={serviceOptions.regions}
                  closeMenuOnScroll={() => true}
                  onChange={(option, meta) => this.handleServiceFilterChange(option, meta)}
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

              {/* Show a message when there are no matching services */}
              {filteredServices.length === 0 && (
                <div className={css.NoServicesMessage}>
                  <h2>No Matches</h2>
                  <p>It looks like we don&apos;t have any services that match all of those filters. Try removing any of the current filters to keep exploring our services.</p>
                </div>
              )}

              {/* Render the filtered services */}
              {filteredServices.length > 0 && filteredServices.map(service => {
                const excerpt = sanitizeHtml(service.excerpt.rendered, { allowedTags: [] });

                { /* Set the services object value for this service */ }
                this.services[service.id] = service;

                return (
                  <div key={service.id} className={css.ServiceCardWrapper}>
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

        <div className={css.ContactStripeWrapper}>
          <div className={css.ContactStripe}>
            <p>
              If you have any questions or comments about our services or you would like to get in touch with us, you can
              <Link href="/post?slug=contact&apiRoute=page" as="/contact">
                <a role="link"> visit this link to contact us or leave us a message.</a>
              </Link>
            </p>
          </div>
        </div>


        {/* Modal */}
        <div className={css.ModalWrapper} id={this.modalHtmlId}>
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
