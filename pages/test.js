import Head from "next/head";
import data from "../data/testData.js";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import styles from "../styles/Index.module.css";
import AppGridLoader from "../components/AppGridLoader";
import dynamic from "next/dynamic";

const DynamicAppGrid = dynamic(
    import("../components/AppGrid"),
    {loading: AppGridLoader}
)

export default function TestAppPage(props){
  
  return(
    <React.Fragment>
      <Head>
        <title>GTBank Applications</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
        <Header/>
        <DynamicAppGrid {...data}/>
        <Footer />
    </React.Fragment>
  )
}

