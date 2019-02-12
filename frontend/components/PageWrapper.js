import { Component } from 'react';
import { Config } from '../config';


const PageWrapper = Comp => (
  class extends Component {
    static async getInitialProps(args) {
      const headerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`);
      const drawerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/mobile-menu`);
      const footerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/footer-menu`);

      const headerMenu = await headerMenuRes.json();
      const drawerMenu = await drawerMenuRes.json();
      const footerMenu = await footerMenuRes.json();

      return {
        headerMenu,
        drawerMenu,
        footerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      // console.log(this.props);

      return (
        <Comp {...this.props} />
      );
    }
  }
);


export default PageWrapper;
