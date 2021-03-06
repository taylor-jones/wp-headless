/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { PureComponent, Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaFacebookSquare } from 'react-icons/fa';
import { Config } from '../../config';
import { getSlug, mappedSlug } from '../../lib/commonUtils';
import css from './Menu.scss';



class Menu extends PureComponent {
  /**
   * Looks for a url within a string that matches the Config.apiUrl,
   * which is the original url that WordPress thinks the pages are at.
   * If found, it replaces that url with it's respective slug.
   *
   * @param {string} text - a string that may or may not contain a site url.
   * @returns {string} - a string where the url is replaced with it's slug.
   */
  updateSlugInText = text => {
    const pattern = `"(https?://)?${Config.apiUrl}.+"`;
    return text.replace(new RegExp(pattern, 'g'), getSlug);
  }


  /**
   * Returns the actual page that should be used (from the pages/ directory)
   * for a given menu item. This means that a custom post type should have
   * it's own page within the pages/ directory.
   *
   * @param {object} item - a menu item object
   * @returns {string} - the name of the page type
   */
  getActualPage = item => {
    if (item.object === 'page' || item.object === 'post') return 'post';
    return item.object;
    // return item.object === 'category' ? 'category' : 'post';
  }


  /**
   * Uses a menu item's object type and slug to determine
   * the value of the menu item's Link.href attribute.
   *
   * @param {object} item - the menu item object
   * @param {string} slug - the slug url path
   * @returns {string} - the value that should be used for the Link.href
   */
  getLinkHref = (item, slug) => {
    // if it's a custom object, use the url
    if (item.object === 'custom') {
      return item.url;
    }

    // all other non-custom items have a consistent structure.
    return `/${this.getActualPage(item)}?slug=${slug}&apiRoute=${item.object}`;
  }


  /**
   * Uses a menu item's object type and slug to determine
   * the value of the menu item's Link.as attribute.
   *
   * @param {object} item - the menu ites object
   * @param {string} slug - the slug url path
   * @returns {string} - the value that should be used for the Link.as
   */
  getLinkAs = (item, slug) => {
    if (item.object === 'page') {
      return `/${slug}`;
    } else if (item.object === 'custom') {
      return item.url;
    }

    return `/${item.object}/${slug}`;
  }


  /**
   * Returns a set of Link properties for a given menu item.
   * @param {object} item - the menu item object
   * @returns {object}
   */
  getMenuItemAttributes = item => {
    const slug = mappedSlug(getSlug(item.url, 2));
    const attr = {
      key: item.ID,
      href: this.getLinkHref(item, slug),
      as: this.getLinkAs(item, slug),
      hasChildren: item.items.length > 0,
      slug,
    };

    // update the className based on the parent state
    // and active state of the menu item.

    // make sure to update the home page link
    if (attr.as === '/') attr.href = '/';
    return attr;
  }


  /**
   * Uses the attributes of a given menu item to determine the
   * menu items classname. The fn checks if the item has child items
   * and/or if the item is the active item.
   *
   * @param {object} attr - an object of menu item attributes.
   * @returns {string} - the className that should be applied to the item.
   */
  getMenuItemClassName = attr => {
    let itemClass = '';
    if (attr.hasChildren) itemClass = this.props.submenuParentClass;
    if (attr.slug === this.props.activeSlug) itemClass += ` ${css.Active}`;
    return itemClass;
  }


  /**
   * Helper function that may be used for various title scenarios
   * in order to modify the title output before rendering.
   *
   * @param {object} item - the menu item object
   * @returns {string}
   */
  getMenuItemTitle = item => {
    if (item.title === 'facebook') {
      return (
        <Fragment>
          <FaFacebookSquare /> {item.title}
        </Fragment>
      );
    }

    return (
      <Fragment>
        {item.title}
      </Fragment>
    );
  }


  /**
   * Recursively builds a JSX node containing any child elements
   * of the argued item.
   *
   * @param {object} item - the menu item object
   * @param {object} attr - the menu item attribute object
   * @param {string} submenuClass - the classname to apply to nested child lists.
   * @returns {JSX}
   */
  getMenuItemChildren = (item, attr, submenuClass) => {
    if (attr.hasChildren) {
      return (
        <ul className={submenuClass}>
          {item.items.map(child => this.getMenuItem(child))}
        </ul>
      );
    }

    return null;
  }


  /**
   * Recursively retrieves a menu item and all if it's
   * child menu items (along with each item's attributes)
   *
   * @param {object} item - the menu item to build jsx for.
   * @returns {jsx} - the jsx markup for the menu item
   */
  getMenuItem = item => {
    // console.log(item);
    const { submenuClass, headingClass } = this.props;
    const attr = this.getMenuItemAttributes(item);
    const itemClass = this.getMenuItemClassName(attr);

    return (
      <li key={attr.key} className={itemClass}>
        {/* If the item is a link, give it an achor */}
        {item.is_link && (
          <Fragment>
            <Link prefetch href={attr.href} as={attr.as}>
              <a onClick={this.props.clicked} role="link">
                {this.getMenuItemTitle(item)}
              </a>
            </Link>

            {this.getMenuItemChildren(item, attr, submenuClass)}
          </Fragment>
        )}


        {/* If the item isn't a link, make it a heading. */}
        {!item.is_link && (
          <ul>
            <li className={headingClass}>{item.title}</li>
            {this.getMenuItemChildren(item, attr, submenuClass)}
          </ul>
        )}
      </li>
    );
  }


  render() {
    const { menu, menuClass, children } = this.props;

    return (
      <ul className={menuClass}>
        {menu.items.map(item => this.getMenuItem(item))}
        {children}
      </ul>
    );
  }
}


Menu.defaultProps = {
  menuClass: null,
  submenuClass: null,
  submenuParentClass: null,
  headingClass: null,
  clicked: null,
  activeSlug: null,
};

Menu.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
  menuClass: PropTypes.string,
  submenuClass: PropTypes.string,
  submenuParentClass: PropTypes.string,
  headingClass: PropTypes.string,
  clicked: PropTypes.func,
  activeSlug: PropTypes.string,
};


export default Menu;
