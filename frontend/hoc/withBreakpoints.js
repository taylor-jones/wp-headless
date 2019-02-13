import { BreakpointsProvider } from 'react-with-breakpoints';

export default function withBreakpoints(WrappedComponent) {
  function WithBreakpoints(props) {
    return (
      <BreakpointsProvider>
        <WrappedComponent {...props} />
      </BreakpointsProvider>
    );
  }

  // Evaluate the wrapped component's getInitialProps()
  WithBreakpoints.getInitialProps = async (req) => {
    return {
      ...(WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(req) : null),
    };
  };

  // Setup the display name for dev tools
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithBreakpoints.displayName = `withBreakpoints(${wrappedComponentName})`;
  return WithBreakpoints;
}
