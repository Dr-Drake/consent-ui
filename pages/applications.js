import Head from "next/head";
import AppGrid from "../components/AppGrid";
import AppGridLoader from "../components/AppGridLoader";
import data from "../data/testData.js";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import styles from "../styles/Index.module.css";
import axios from "axios";
import {connect} from "react-redux";
import {actions} from "../redux/ActionCreators";
import jwt from "jsonwebtoken";
import parseCookies from "../utils/parseCookies";
import redirect from "../utils/redirect";
import {initializeStore} from "../redux/store"
import {useCookies} from "react-cookie";
import dynamic from "next/dynamic";

// Action creators
const {loadApplications, loadCustomerName, removeApplication} = actions

const mapStateToProps = (dataStore) =>({
  ...dataStore
});

const mapDispatchToProps = {
  loadApplications, loadCustomerName, removeApplication
}

// Dynamic Import of AppGrid
const DynamicAppGrid = dynamic(
  import("../components/AppGrid"),
  {loading: AppGridLoader}
)

function AppPage(props){

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // Refresh jwt after the current one expires
  React.useEffect(()=>{
      //let refreshTime = Date.now() - props.tokenExp
      const headers ={
        'x-ci-key': process.env.API_KEY  , 
      }
      if (props.isRemembered === "true"){
        setInterval(()=>{
          axios.get(process.env.REFRESH_API, {headers: headers, withCredentials: true}).then((response)=>{
            var decoded = jwt.decode(response.data.token);
            //refreshTime = decoded.exp * 1000;
            var cookieOptions = {
              expires: new Date(decoded.exp * 1000) // in milliseconds
  
            }
            setCookie("user", response.data.token, cookieOptions);
          }).catch((err)=>{
            removeCookie("user")
          })
        }, props.tokenExp);
      }
  })
  
  return(
    <React.Fragment>
      <Head>
        <title>GTBank Applications</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
        <Header {...props}/>
        <DynamicAppGrid {...props}/>
        <Footer />
    </React.Fragment>
  )
}

export async function getServerSideProps(context){
  const reduxStore = initializeStore();
  const {dispatch} = reduxStore

  const data = parseCookies(context.req);

  try{
      // Check if token is in cookie
    if (data.user){
      var decoded = jwt.decode(data.user);
      const headers ={
        'Authorization': `Bearer ${data.user}`,
        'x-ci-key': process.env.API_KEY   
      }
      var response = await axios.get(process.env.APPLICATION_API, {headers: headers});
      
      if (response){

        // No application found
        if (response.data.message){

          // Initialiaze the store
          dispatch(loadCustomerName(decoded.name));
          dispatch(loadApplications([]));
          return { props: { 
            initialReduxState: reduxStore.getState(), 
            tokenExp: (decoded.exp - decoded.iat) * 1000,
            isRemembered: data.isRemembered  // If stay signed in is selected
          },
             
          }
        }

        // Initialiaze the store
        dispatch(loadCustomerName(decoded.name));
        dispatch(loadApplications(response.data));
        return { props: { 
          initialReduxState: reduxStore.getState(), 
          tokenExp: (decoded.exp - decoded.iat) * 1000,
          isRemembered: data.isRemembered  // If stay signed in is selected
        },
           
        }
      }
    }

    // No user -- redirect
    redirect(context.res, "/login");
    return {props:{custom: "no user"}}

  }catch(err){

    // Unexpected error -- redirect
    redirect(context.res, "/login");
    return {props:{ err: "Unexpected error"}}
  }
}

/*AppPage.getInitialProps = async (context) =>{

  console.log(Object.keys(context))
  //console.log(typeof(context.store.dispatch))
  
  const data = parseCookies(context.req);

  try{
      // Check if token is in cookie
    if (data.user){
      var decoded = jwt.decode(data.user);
      const headers ={
        'Authorization': `Bearer ${data.user}`,
        'x-ci-key': process.env.API_KEY   
      }
      var response = await axios.get(process.env.APPLICATION_API, {headers: headers});
      
      if (response){

        // Initialiaze the store
        context.store.dispatch(loadCustomerName(decoded.name));
        context.store.dispatch(loadApplications(response.data));
        return {custom: "success"}
      }
    }

    // No user -- redirect
    redirect(context.res, "/login");
    return {custom: "no user"}

  }catch(err){
    redirect(context.res, "/login");
    return { err: "Unexpected error"}
  }
}*/

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
