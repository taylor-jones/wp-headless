import { Config } from '../config';

export default function withPageWrapper(WrappedComponent) {
  function WithPageWrapper(props) {
    return <WrappedComponent {...props} />;
  }

  // Evaluate the wrapped component's getInitialProps()
  WithPageWrapper.getInitialProps = async (req) => {
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
      ...(WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(req) : null),
    };
  };

  // Setup the display name for dev tools
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithPageWrapper.displayName = `withPageWrapper(${wrappedComponentName})`;
  return WithPageWrapper;
}
