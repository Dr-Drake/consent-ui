import {Col, Card, Row} from "react-bootstrap"
import {useState, useEffect, useRef} from "react";
import styles from "../styles/AppCard.module.css";
import {Button, Divider, Accordion, AccordionDetails, Modal, 
    Paper, Backdrop, Fade, Snackbar} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles"
import AccessDescription from "./AccessDescription";
import {motion} from "framer-motion";
import React from "react";
import {CustomButton, CustomAccordionSummary, OKButton} from "./Custom";
import axios from "axios";
import {useCookies} from "react-cookie";


const useStyles = makeStyles({
    logo:{
        display: "flex", 
        backgroundColor: "#DE4A09", 
        alignItems:"center", 
        justifyContent: "center", 
        fontWeight:"700",
        fontSize: "22px",
        color: "white"
    },

    name:{
        display: "flex", 
        alignItems:"center", 
        justifyContent: "center",
        fontSize: "medium",
        fontWeight: "bold",
        wordWrap:"break-word",
        overflow: "hidden"
    }
})

/**
 * Functional component that returns a Material UI Accordion component
 * with information regarding the application.
 * 
 * When the component is clicked, it expands to show more information regarding
 * what the application has access to.
 * This information is rendered by the AccessDescription component.
 * 
 * @typedef {Object <any>} props Component props.
 * @property {String} name The name of the application.
 * @property {String} logo The logo of the application.
 * @property {Array} scopes An array of scope objects that have the properties type and date.
 */
export default function AppCard({id, name, logo, scopes, removeApplication}){

    const classes = useStyles();

    // States for expansion of the accordion and the opening of the modal.
    const [expand, setExanpsion] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false)

    // Cookies state
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

   /**
    * Function that determines what the logo on the accordion will look like.
    * 
    * If the logo exist then it is returns
    * Otherwise, the first letter of the application's name is returned instead.
    * 
    * Note: For now, we are not actually expecting the actual logo.
    */
    const confirmLogo = ()=>{
        if (logo){
            return (
                <img src={logo} />
            )
        } else {
            return name.slice(0,1)
        }
    }

    /**
     * Function that returns the style for the accordion based on whether or not
     * it was expanded.
     * If expanded, the background colour changes.
     */
    const expandStyle = () =>{
       if (expand){
           return {
               backgroundColor: "#EDEDED",
           }
       }

       return {};
   }

   const removeClass = () =>{
       if (isRemoving){
           return `${styles.paper} ${styles.loading}`
       }

       return styles.paper
   }


   // Snackbar close function
   const handleClose = (event, reason) =>{
    if (reason === "clickaway"){
        return;
    }
    setSnackOpen(false);
}

   const deleteApplication = () =>{
       setIsRemoving(true);
        const headers ={
            'Authorization': `Bearer ${cookies.user}`,
            'x-ci-key': process.env.API_KEY   
        }
        axios.delete(process.env.APPLICATION_API + `?application=${id}`,
        {headers: headers}).then((response)=>{
        
            // Remove it from the redux store
            removeApplication(id);
            setIsRemoving(false);
            setOpen(false);

        }).catch((error)=>{
            console.log(error)
            // Error while calling delete
            setIsRemoving(false);
            setSnackOpen(true);
        })
   }

    /**
     * Returns an Accordion component.
     * The accordion wraps an Accordion Summary and Accordion Details.
     * 
     * The Accordion Summary wraps a div.
     * This div wraps a div element protraying the logo, and a p element portraying
     * the name of the application.
     * 
     * The Accordion Details wraps a react-bootstrap Card component, and a Customized
     * Material UI Buttom Component.
     * The Card component is dynamic, rendering an AccessDescription Component for every scope
     * in the scopes array. Every AccessDescription component is accompanied by a Divider 
     * component, except the last one rendered.
     * 
     * The Buttom component triggers the display of a Material UI Modal component.
     */
    return(
        <React.Fragment>
        <Accordion style={expandStyle()} onChange={()=> setExanpsion(!expand)} className={styles.accordion}>
            <CustomAccordionSummary>
                <Row style={{width: "100%", margin: "0"}}>
                    <Col xs={1} className={styles.logo}>
                        {confirmLogo()}
                    </Col>
                    <Col className={styles.name}>
                        {name}
                    </Col>
                </Row>
            </CustomAccordionSummary>
            <AccordionDetails style={{flexDirection: "column"}}>
                <Card key={id} className={styles["the-body"]}>
                    Has access to:

                    {scopes.map((scope, index)=>{
                        if (!scopes[index+1]){
                            return(
                                <React.Fragment>
                                    <AccessDescription key={index} scope={scope} />
                                </React.Fragment>
                            )
                        }
                        return(
                            <React.Fragment>
                                <AccessDescription key={index} scope={scope} />
                                <Divider key={index}/>
                            </React.Fragment>
                        )
                    })}
                    
                </Card>

                <CustomButton variant="contained" onClick={()=> setOpen(true)}>Remove Access</CustomButton>
            </AccordionDetails>
        </Accordion>
        
        <Modal
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}
        style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "0 15px"}}>
            <Fade in={open}>
                <Paper elevation={3} className={removeClass()}>
                    <div id="simple-modal-title" style={{fontWeight: "500", fontSize: "20px"}}>
                        Remove access?
                    </div>
                    <p id="simple-modal-description" style={{
                        color: "#3c4043", 
                        fontSize: "14px", 
                        padding: "10px 0 0 0", 
                        fontWeight: "400",
                        }}>
                        {`${name} will no longer have access to your GTB Account. 
                        You’ll need to grant access if you want to use this app or service again.`}
                    </p>
                    <div style={{padding: "24px 24px 0 24px",
                    display: "flex",
                justifyContent: "flex-end"}}>
                        {isRemoving ?
                        <Button disabled>CANCEL</Button> :
                        <Button onClick={()=> setOpen(false)}>CANCEL</Button>}

                        {isRemoving? 
                        <OKButton disabled>OK</OKButton> : 
                        <OKButton onClick={deleteApplication}>OK</OKButton>}
                    </div>
                </Paper>
            </Fade>
        </Modal>

        <Snackbar
            open={snackOpen}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            onClose={handleClose}
        >
            <Alert severity="error" onClose={handleClose}>
                An unexpected error while deleting the application
            </Alert>
        </Snackbar>
        
        </React.Fragment>
    )
}