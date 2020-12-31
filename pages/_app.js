import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import {useStore} from "../redux/store";
import {createWrapper} from "next-redux-wrapper";
import {CookiesProvider} from "react-cookie"
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import React from "react"
;
export default function MyApp(AppProps) {
  //console.log(JSON.stringify(AppProps));

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  const {Component, pageProps} = AppProps;
  const store = useStore(pageProps.initialReduxState)
  return(

    <CookiesProvider>
      <Provider store={store}>
        <ScopedCssBaseline />
        <Component {...pageProps} />
      </Provider>  
    </CookiesProvider>
    
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

/*MyApp.getInitialProps = async (AppContext) =>{
  const {Component, ctx} = AppContext;

  //console.log(Object.keys(ctx))
  
  if (Component.getInitialProps){
    return {pageProps: await Component.getInitialProps(ctx)};
  }

  return {pageProps: {}};

}*/

//const wrapper = createWrapper(makeStore)

// Creates store instance and makes in available in getInitialProps
//export default wrapper.withRedux(MyApp);
