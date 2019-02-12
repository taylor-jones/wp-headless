import { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Config } from '../config';

const { getSlug, mappedSlug } = require('../lib/commonUtils');

const linkStyle = {
  marginRight: 15,
};

class Menu extends Component {
  render() {
    const menuItems = this.props.menu.items.map((item, index) => {
      if (item.object === 'custom') {
        return (
          <Link href={item.url} key={item.ID}>
            <a style={linkStyle}>{item.title}</a>
          </Link>
        );
      }
      const slug = mappedSlug(getSlug(item.url, 2));
      const actualPage = item.object === 'category' ? 'category' : 'post';
      return (
        <Link
          as={`/${item.object}/${slug}`}
          href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          key={item.ID}
        >
          <a style={linkStyle}>{item.title}</a>
        </Link>
      );
    });


    return (
      <div>
        {/* <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link> */}
        {menuItems}
      </div>
    );
  }
}


Menu.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
};

export default Menu;
