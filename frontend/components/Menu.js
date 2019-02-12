import { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Config } from '../config';

// const { getSlug } = require('../lib/commonUtils');

const linkStyle = {
  marginRight: 15,
};

class Menu extends Component {
  getSlug = url => {
    const parts = url.split('/');
    const slug = parts.length > 2 ? parts[parts.length - 2] : url;
    console.log(`PARTS: ${parts.length}\tURL: ${url}\tSLUG: ${slug}`);
    return slug;
  }

  render() {
    const menuItems = this.props.menu.items.map((item, index) => {
      if (item.object === 'custom') {
        return (
          <Link href={item.url} key={item.ID}>
            <a style={linkStyle}>{item.title}</a>
          </Link>
        );
      }
      const slug = this.getSlug(item.url);
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
