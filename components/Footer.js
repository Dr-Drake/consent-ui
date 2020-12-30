import styles from "../styles/Footer.module.css";
import socials from "../data/socials";

export default function Footer(props){

    return(
        <div className={styles.footer}>
            <div>
                <p>
                    {`© ${new Date().getFullYear()} Guaranty Trust Bank Plc. RC 152321. All Rights Reserved.`}
                    </p>
            </div>
            
        
            <ul className={styles.socials}>
                {socials.map((item, index)=>{
                    return(
                        <li key={index}>
                            <a href={item.uri}
                            target="_blank" rel="noopener" 
                            data-toggle="tooltip" data-offset="0, 5" 
                            title="" 
                            data-original-title={item.title}>

                                <img src={item.icon} />
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}