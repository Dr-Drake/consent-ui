import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Icon, SvgIcon} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import {List, ListItem, ListItemText, ListItemIcon, Divider} from "@material-ui/core";
import {useState, useEffect} from "react";
import React from "react";
import styles from "../styles/MyNavBar.module.css";
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


const useStyles = makeStyles({
    primary:{
        fontSize: "14px",
    }
});


export default function MyNavBar(props){
    // Next router
    const router = useRouter();

    // classes
    const classes = useStyles();

    // States
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    useEffect(()=>{
        var myNav = document.getElementById("site-nav");
        /*setHeight(myNav.scrollHeight);*/
        if (expanded){
           document.body.style.overflow = "hidden";
        } else{
            document.body.style.overflow = "";
        }

    })
    const responsiveNavStyle = () =>{
        if (expanded){
            return{
                backgroundColor: "white",
                padding: "0", 
                position: "absolute",
                left: "0",
                position: "fixed",
                zIndex: "100",
                transition: "left 0.5s",
            }
        }

        return {
            backgroundColor: "white",
            padding: "0", 
            position: "absolute",
            left: "-100%",
            position: "fixed",
            zIndex: "100",
            transition: "left 0.5s",
        }
    }

    const logOut = () =>{
        const headers ={
            'Content-Type': 'application/json',
            'x-ci-key': process.env.API_KEY   
        }
        axios.post(process.env.LOGOUT_API, {}, {headers: headers, withCredentials: true}).then((response)=>{
            if (response.data.message){

                // Delete cookie and redirect to login page
                removeCookie("user");
                router.push("/login")
            }
        }).catch((error)=>{
            if (error.response.data.error){
                console.log(error.response.data.message);

                // Still delete cookie and redirect to login page
                removeCookie("user");
                router.push("/login")
                return
            }

            // Still delete cookie and redirect to login page
            //removeCookie("user");
            //router.push("/")
        })
    }


    return(
        <React.Fragment>
            {expanded && <div id="overlay" style={{
                position: "fixed", 
                width: "100%", 
                height: "100vh", 
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: "2",
                cursor: "pointer",
            }}
            
            onClick={()=> setExpanded(!expanded)}></div>}

            <List 
            id="responsive-menu" 
            style={responsiveNavStyle()}
            className={styles["responsive-menu"]}
            >
                <ListItem style={{backgroundColor: "#434a51", color: "white"}}>
                    <ListItemText style={{width: "auto", 
                    whiteSpace: "nowrap",
                    paddingRight: "2rem"}} classes={classes}>
                        GTBank Applications
                    </ListItemText>
                    <Icon style={{backgroundImage: `url("/Guaranty Trust Bank Logo.svg")`,
                backgroundSize: "contain",
                padding: "20px",
                backgroundColor: "red"}}>
                    </Icon>
                </ListItem>
                <Divider/>

                <ListItem button onClick={logOut}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText classes={classes} primary="Logout" />
                </ListItem>
            </List>
            
            <nav id="site-nav" style={{
            backgroundColor: "white", 
            display: "flex",
            alignItems: "center",
            padding: "10px",
            justifyContent: "space-between",
            margin: "0",
            zIndex: "1",
            width: "100%",
            position: "sticky",
            top: "0",
            }}>
            <button id="burger" style={{height: "10", backgroundColor:"transparent", borderColor: "transparent", color: "#DE4A09"}} onClick={()=>{setExpanded(!expanded);}}>
                <MenuIcon />
            </button>


            <div id="site-title" style={{fontWeight: "500", color: "#DE4A09"}}>
               GTB Applications
            </div>

            <Icon id="site-logo" style={{backgroundImage: `url("/Guaranty Trust Bank Logo.svg")`,
                backgroundSize: "contain",
                padding: "20px",
                backgroundColor: "red"}}>
            </Icon>

            <List id="main-menu" style={{backgroundColor: "salmon", display: "none"}}>
                <ListItem button>
                    Logout
                </ListItem>
            </List>
        </nav>
        </React.Fragment>
    )
}