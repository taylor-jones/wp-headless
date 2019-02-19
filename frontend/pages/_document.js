import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import Comment from '../components/Comment';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <html lang="en" dir="ltr">
          <Head>
            {/* Inject the JSS styles here, before the rest of the styles */}
            <Comment text="jss-insertion-point" />
          </Head>

          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      </JssProvider>
    );
  }
}

export default MyDocument;


//   static async getInitialProps(ctx) {
//     // Resolution order
//     //
//     // On the server:
//     // 1. page.getInitialProps
//     // 2. document.getInitialProps
//     // 3. page.render
//     // 4. document.render
//     //
//     // On the server with error:
//     // 2. document.getInitialProps
//     // 3. page.render
//     // 4. document.render
//     //
//     // On the client
//     // 1. page.getInitialProps
//     // 3. page.render

//     // Get the context to collected side effects.
//     const context = getContext();
//     /* eslint-disable */
//     const page = ctx.renderPage(Component => props => (
//       <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
//         <Component {...props} />
//       </JssProvider>
//     ))
//     /* eslint-enable */

//     return {
//       ...page,
//       stylesContext: context,
//       styles: (
//         <style
//           id="jss-server-side"
//           // eslint-disable-next-line react/no-danger
//           dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }}
//         />
//       ),
//     };
//   }
