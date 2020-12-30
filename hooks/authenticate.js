import {useEffect} from "react";
import jwt from "jsonwebtoken";
import Router from "next/router";
import axios from "axios";

export default function authenticate(props){
   // Check if token is in localStorage
  if (localStorage.user){
    var decoded = jwt.decode(localStorage.user);
    const headers ={
      'Authorization': `Bearer ${localStorage.user}`,
      'x-ci-key': process.env.API_KEY   
    }

    // If there is, get all the applications
    axios.get(process.env.APPLICATION_API, {headers: headers}).then((response)=>{

      // load the user's name in redux store
      props.loadCustomerName(decoded.name);

      // load the applications
      props.loadApplications(response.data);

    }).catch((err)=>{
      
      // Error suggests that token is invalid (or something unexpected happened)
      // So redirect to login page
      
      // Client-side redirect
      Router.push("/login");

    })

  } else{

    // Redirect to login page

      // Client-side redirect
      Router.push("/login");
    
  }
}
