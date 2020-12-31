import {useState} from "react";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import React from "react";
import LoginForm from "../components/LoginForm";
import Loader from "../components/Loader";
import parseCookies from "../utils/parseCookies";
import redirect from "../utils//redirect";


export default function LoginPage(props){

    const [isLoading, setIsLoading] = useState(false);

    const validate =()=>{
        setError(true);
        setHelperText("Wrong username");
    }

    const unhighlight = ()=>{
        setError(false);
        setHelperText(null);
    }
    return(
        <React.Fragment>
            <Head>
                <title>GTBank Applications</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet" />
            </Head>
            <div>
                <div id="branding" className={styles['background-wrapper']}>
                    <div className={styles['login-background']}></div>
                </div>
                <div id="loginForm" className={styles['login-page']}>
                   {isLoading && <Loader />}

                   <div className={styles.loginArea}>
                        <img className={styles.logo} src="/logo-gt.png" alt="GTBank" />
                   </div>

                   <LoginForm setIsLoading={setIsLoading} />

                </div>
            </div>
        </React.Fragment>
    )
}

export async function getServerSideProps(context){
    const data = parseCookies(context.req);
  
    try{
        // Check if token is in cookie -- redirect if so
      if (data.user){
            redirect(context.res, "/applications");
            return {props: {custom: "user here"}}
      }
      console.log("No user")
      return {props:{custom: "no user"}}
  
    }catch(err){
  
      // Unexpected error -- redirect
      return {props:{ err: "Unexpected error"}}
    }
}