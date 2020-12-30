import {Container, Row, Col} from "react-bootstrap";
import {useState, useEffect} from "react";
import {TextField, Paper} from "@material-ui/core";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import AppCard from "./AppCard";
import styles from "../styles/AppGrid.module.css";

const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },

      '& label.MuiInputLabel-root':{
          fontSize: "14px",
          color: "white",
      },

      '& .MuiInput-underline:before':{
        borderBottomColor: "white",
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },

      },
    },
})(TextField);



export default function AppGrid(props){


    const [width, setWidth] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(()=>{
        window.addEventListener("load", ()=>{
            setWidth(window.innerWidth);
        })

        window.addEventListener("resize", ()=>{
          setWidth(window.innerWidth);
      })
    })

    const dynamicSearch = (term) =>{
        return props.apps.filter((app)=>{
            return app.name.toLowerCase().startsWith(term.toLowerCase())
        })
    }

    const editSearchTerm = (e)=>{
        setSearchTerm(e.target.value)
    }

    const inputProps = {
        value: searchTerm,
        onChange: editSearchTerm
    }


    return(
        <Container fluid className={styles["app-grid-container"]}>
            <CustomTextField id="custom-css-standard-input" 
            label="Search application's name"
            inputProps={inputProps} />
            <Row lg={2} md={2} xs={1} className={styles.row}>
                {dynamicSearch(searchTerm).map((item, index)=>{
                    return(
                    <Col key={index} lg={4} key={index} style={{paddingTop: "1rem"}}>
                        <AppCard key={index} removeApplication={props.removeApplication} {...item} />
                    </Col>
                    )
                })}
                {props.apps.length < 1 && <Col style={{paddingTop: "1rem"}}>
                  <Paper elevation={3}>
                    <div style={{
                      backgroundColor: "#EDEDED", height: "100%", 
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2rem"
                      }}>
                      No application(s) found
                    </div>
                  </Paper>
                </Col>}

            </Row>
        </Container>
    )
    
    
}