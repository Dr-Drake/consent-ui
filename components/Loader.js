import styles from "../styles/Loader.module.css";
import React from "react";

/**
 * 
 * @param {Object} props Component props
 */
export default function Loader(props){

    return(
        <React.Fragment>
            <div id="overlay" className={styles.overlay}></div>
            <div id="loader" className={styles.linePreloader}></div>
        </React.Fragment>

    )
}