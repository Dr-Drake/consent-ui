import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {useStore} from "../redux/store";
import {createWrapper} from "next-redux-wrapper";
import {CookiesProvider} from "react-cookie"

export default function MyApp(AppProps) {
  //console.log(JSON.stringify(AppProps));
  
  const {Component, pageProps} = AppProps;
  const store = useStore(pageProps.initialReduxState)
  return(

    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>  
    </CookiesProvider>
    
  )
}

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
