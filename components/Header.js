import React from "react";
import NavBar from "./MyNavBar";
import {useEffect, useState} from "react";


export default function Header(props){
    
    return(
        <React.Fragment>
            <NavBar />
            <div style={{padding: "15px", backgroundColor: "whitesmoke"}}>
                <h3>Welcome</h3>
    <p style={{fontSize: "14px", textTransform: "uppercase"}}>{props.fullname}</p>
            </div>

            <div  style={{padding: "15px"}}>
                <div style={{fontSize: "18px", fontWeight: "600"}}>Third-party apps with account access</div><br/>
                <div style={{fontSize: "14px"}}>
                    You gave these sites and apps access to some of your GTB Account data, 
                    including info that may be sensitive. <br/>
                    Remove access for those that you no longer trust or use. 
                </div>
            </div>
        </React.Fragment>
        
    )
}