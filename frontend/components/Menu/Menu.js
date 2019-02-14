import { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Config } from '../../config';
import { getSlug, mappedSlug } from '../../lib/commonUtils';
import css from './Menu.scss';


/**
 * Looks for a url within a string that matches the Config.apiUrl,
 * which is the original url that WordPress thinks the pages are at.
 * If found, it replaces that url with it's respective slug.
 *
 * @param {string} text - a string that may or may not contain a site url.
 * @returns {string} - a string where the url is replaced with it's slug.
 */
const updateSlugInText = text => {
  const pattern = `"(https?://)?${Config.apiUrl}.+"`;
  return text.replace(new RegExp(pattern, 'g'), getSlug);
};


/**
 * Returns the actual page type for a given menu item.
 *
 * @param {object} item - a menu item object
 * @returns {string} - the name of the page type
 */
const getActualPage = item => {
  return item.object === 'category' ? 'category' : 'post';
};


/**
 * Uses a menu item's object type and slug to determine
 * the value of the menu item's Link.href attribute.
 *
 * @param {object} item - the menu item object
 * @param {string} slug - the slug url path
 * @returns {string} - the value that should be used for the Link.href
 */
const getLinkHref = (item, slug) => {
  // if it's a custom object, use the url
  if (item.object === 'custom') {
    return item.url;
  }

  // all other non-custom items have a consistent structure.
  return `/${getActualPage(item)}?slug=${slug}&apiRoute=${item.object}`;
};


/**
 * Uses a menu item's object type and slug to determine
 * the value of the menu item's Link.as attribute.
 *
 * @param {object} item - the menu ites object
 * @param {string} slug - the slug url path
 * @returns {string} - the value that should be used for the Link.as
 */
const getLinkAs = (item, slug) => {
  if (item.object === 'page') {
    return `/${slug}`;
  } else if (item.object === 'custom') {
    return item.url;
  }

  return `/${item.object}/${slug}`;
};


/**
 * Returns a set of Link properties for a given menu item.
 * @param {object} item - the menu item object
 * @returns {object}
 */
const getMenuItemAttributes = item => {
  const slug = mappedSlug(getSlug(item.url, 2));
  const attr = {
    key: item.ID,
    href: getLinkHref(item, slug),
    as: getLinkAs(item, slug),
    hasChildren: item.items.length > 0,
    className: '',    // for now, eventually dynamically determined
  };

  // make sure to update the home page link
  if (attr.as === '/') attr.href = '/';
  return attr;
};



class Menu extends Component {
  /**
   * Recursively retrieves a menu item and all if it's
   * child menu items (along with each item's attributes)
   *
   * @param {object} item - the menu item to build jsx for.
   * @returns {jsx} - the jsx markup for the menu item
   */
  getMenuItem = item => {
    const attr = getMenuItemAttributes(item);
    // console.log(attr);

    return (
      <li key={attr.key} className={attr.className}>
        <Link href={attr.href} as={attr.as}>
          <a onClick={this.props.clicked} role="presentation">
            {item.title}
          </a>
        </Link>

        {attr.hasChildren && (
          <ul>{item.items.map(child => this.getMenuItem(child))}</ul>
        )}
      </li>
    );
  }


  render() {
    return (
      <nav>
        <ul>
          {this.props.menu.items.map(item => this.getMenuItem(item))}
        </ul>
      </nav>
    );
  }
}


Menu.defaultProps = {
  clicked: null,
};

Menu.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
  clicked: PropTypes.func,
};


export default Menu;
