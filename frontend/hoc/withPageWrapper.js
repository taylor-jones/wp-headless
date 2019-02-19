import { PureComponent } from 'react';
// import { BreakpointsProvider } from 'react-with-breakpoints';
import { Config } from '../config';


const getComposedDisplayName = Component => {
  return Component.displayName || Component.name || 'Component';
};


const WithPageWrapper = WrappedComponent => (
  class extends PureComponent {
    static async getInitialProps(req) {
      const headerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`);
      const drawerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/mobile-menu`);
      const footerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/footer-menu`);
      const baseMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/base-menu`);

      const headerMenu = await headerMenuRes.json();
      const drawerMenu = await drawerMenuRes.json();
      const footerMenu = await footerMenuRes.json();
      const baseMenu = await baseMenuRes.json();

      return {
        headerMenu,
        drawerMenu,
        footerMenu,
        baseMenu,
        ...(WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(req) : null),
      };
    }

    // Setup the display name for dev tools
    static displayName = `withPageWrapper(${getComposedDisplayName(WrappedComponent)})`;

    render() {
      return (
        // <BreakpointsProvider>
        <WrappedComponent {...this.props} />
        // </BreakpointsProvider>
      );
    }
  }
);

export default WithPageWrapper;
