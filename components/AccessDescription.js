import styles from "../styles/AccessDescription.module.css";
import {Row, Col} from "react-bootstrap";
import scopeData from "../data/scopes";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PaymentIcon from '@material-ui/icons/Payment';

// Month names
const monthNames = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
];

/**
 * This component relies on a scope object, e.g {type: "scope1", date: new Date()}.
 * It uses this information to generate a description of what the user has granted acess to
 * based on the scope.
 * 
 * @typedef {Object<any>} props Component props
 * @property {Object} scope The scope object containing information on the 
 *  of scope and the date the user granted access to that scope.
 */
export default function AccessDescription({scope}){

    // Declaring Icon component to be used for  description.
    var Icon;

    // Icon component used varies with the scope type
    if (scope.type === "scope1"){
        Icon = PaymentIcon;
    }

    if (scope.type === "scope2"){
        Icon = AccountBalanceIcon;
    }

    const theDate = new Date(scope.date);

    /**
     * Returns a row with with two columns.
     * The first column is a div element with the Icon component.
     * The second column has two rows, and a div element at the bottom.
     * 
     * Row 1 - Shows the description title
     * Row 2 - This is dynamic. It contains various div elements, each representing the 
     *         description of the accesss given.
     * 
     * The bottom div describes the date that the access was granted on.
     */
    return(
        <Row style={{ margin: "0.5rem 0"}}>
            <div>
                <Icon />
            </div>
            <Col style={{paddingLeft: "0.5rem"}}>
                <Row className={styles.title}>
                    {scopeData[scope.type].title}
                </Row>
                <Row className={styles["description-main"]}>
                    {scopeData[scope.type].descriptions.map((item, index)=>{

                        return(
                            <div key={index} className={styles.description}>
                                {item.description}
                            </div>
                        )
                    })}
                </Row>
                <div style={{padding: "0.5rem 0", fontSize: "12px", backgroundColor:"whitesmoke", fontWeight: "500"}}>
                    Access given on:
                    <span>
                        {` ${theDate.getDate()} ${monthNames[theDate.getMonth()]}, ${theDate.getHours()}:${theDate.getMinutes()}`}
                    </span>
                </div>
            </Col>
        </Row>
    )
}