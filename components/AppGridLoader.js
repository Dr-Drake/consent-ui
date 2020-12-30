import {Container, Row, Col, Card} from "react-bootstrap";
import {useState} from "react";
import {TextField, Paper} from "@material-ui/core";
import {withStyles, makeStyles} from "@material-ui/core/styles";

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
    const [searchTerm, setSearchTerm] = useState("");
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

                <Col lg={4} style={{paddingTop: "1rem"}}>
                    <Card className={styles.skeleton}></Card>
                </Col>
                <Col lg={4} style={{paddingTop: "1rem"}}>
                    <Card className={styles.skeleton}></Card>
                </Col>
                <Col lg={4} style={{paddingTop: "1rem"}}>
                    <Card className={styles.skeleton}></Card>
                </Col>
                <Col lg={4} style={{paddingTop: "1rem"}}>
                    <Card className={styles.skeleton}></Card>
                </Col>
                <Col lg={4} style={{paddingTop: "1rem"}}>
                    <Card className={styles.skeleton}></Card>
                </Col>
                <Col lg={4} style={{paddingTop: "1rem"}}>
                    <Card className={styles.skeleton}></Card>
                </Col>

            </Row>
        </Container>
    )
    
    
}