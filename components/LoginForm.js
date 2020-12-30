import {makeStyles, withStyles} from "@material-ui/core/styles";
import {useState, useRef} from "react";
import {CustomButton, MyInputTextField, CustomCheckbox} from "../components/Custom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {useRouter} from "next/router";
import axios from "axios";
import {Snackbar, InputAdornment, IconButton, Checkbox, FormControlLabel} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import React from "react";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";



// Style class
const useStyles = makeStyles({
    checkBox:{
        "& .Mui-checked":{
            color: "#DE4A09"
        }
       
    },

    form:{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0",
        width: "100%",
    },

    logoArea:{
        display: "flex",
        justifyContent: "center",
        padding: "3% 0"
    },

    inputArea: {
        padding: "5% 15% 0 15%"
    },

    buttonArea:{
        padding: "10% 15% 0 15%",
        width: "100%"
    }
})


/**
 * 
 * @param {Object} props Component props.
 * @param {function} props.setIsLoading Function for setting the Loading state of the form.
 */
export default function LoginForm({setIsLoading}){

    // Next router
    const router = useRouter();

    // classes
    const classes = useStyles();

    // Refs
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const formRef = useRef(null);
    const checkRef = useRef(null);

    // States
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelper, setPasswordHelper] = useState("");
    const [open, setOpen] = useState(false);
    const [cookies, setCookie] = useCookies(["user"]);
    const [showPassword, setShowPassword] = useState(false);


    // Snackbar close function
    const handleClose = (event, reason) =>{
        if (reason === "clickaway"){
            return;
        }
        setOpen(false);
    }


    /* Helper Functions*/

    // Validate empty email input
    const validateEmail = ()=>{
        var email = emailRef.current
        if (/^\s*$/.test(email.value)){
            setEmailError(true);
            setEmailHelper("Username is required");
            return false
        }

        return true
    }

    // Validate empty password input
    const validatePassword = ()=>{
        var password = passwordRef.current
        if (/^\s*$/.test(password.value)){
            setPasswordError(true);
            setPasswordHelper("Password is required");
            return false
        }

        return true
    }

    // Unhighlight onchange
    const unhighlight = (event) =>{
        const {name} = event.target

        if (name === "username"){
            setEmailError(false);
            setEmailHelper("")
        }

        if (name === "password"){
            setPasswordError(false);
            setPasswordHelper("")
        }
        
    }

    // Main onclick function
    const onSubmit = (event) =>{
        event.preventDefault();
        var email_is_valid = validateEmail();
        var password_is_valid = validatePassword();

        // If email and password fields have non-empty entries
        // attempt the login

        if (email_is_valid && password_is_valid){
            setIsLoading(true);
            const form = formRef.current
            const fdata = new FormData(form);
            const isRemembered = checkRef.current.checked
            const payload = {
                username: fdata.get("username"),
                password: fdata.get("password")            
            }
            const headers ={
               'Content-Type': 'application/json',
               'x-ci-key': process.env.API_KEY   
            }

            axios.post(process.env.LOGIN_API, payload, {headers: headers, withCredentials: true}).then((response)=>{

                if (response.data.token){
                    const decoded = jwt.decode(response.data.token);
                    var cookieOptions = {
                        expires: new Date(decoded.exp * 1000) // in milliseconds
                    }
                    setCookie("user", response.data.token, cookieOptions);
                    setCookie("isRemembered", isRemembered);
                    router.push("/")
                }
            }).catch((error)=>{
                setIsLoading(false)

                //alert(error)

                if (error.response.data.error){
                    setEmailError(true);
                    setEmailHelper("Username may be incorrect");
                    setPasswordError(true);
                    setPasswordHelper("Password may be incorrect");
                    return;
                }
                
                // Unexpected error occured, so open the snackbar to inform this
                setOpen(true)
            })
        }
        

    }

    const adornment = (
        <InputAdornment position="end">
            <IconButton ariaaria-label="toggle password visibility"
              onClick={()=> setShowPassword(!showPassword)}
              onMouseDown={(event)=> event.preventDefault()}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
        </InputAdornment>
    )

    // inputProps
    const emailInputProps = {
        name: "username",
    }
    const passwordInputProps = {
        name: "password"
    }

    // InputProps
    const InputPropsPassword = {
        endAdornment: adornment
    }

    return(
        <React.Fragment>
            <Snackbar
                open={open}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleClose}
            >
                <Alert severity="error" onClose={handleClose}>
                    An unexpected error occured while trying to sign you in
                </Alert>
            </Snackbar>

            <form className={classes.form} noValidate ref={formRef} onSubmit={onSubmit}>
                <div className={classes.inputArea}>
                    Sign in with your Customer Id, email, or phone number
                </div>
                <div className={classes.inputArea}>
                    <MyInputTextField 
                        style={{width: "100%"}} 
                        variant="outlined" 
                        error={emailError} 
                        label="Username" 
                        autoFocus={true} 
                        helperText={emailHelper}
                        onChange={unhighlight}
                        inputRef={emailRef}
                        inputProps={emailInputProps}
                    />
                </div>
                <div className={classes.inputArea}>
                    <MyInputTextField 
                        style={{width: "100%"}} 
                        variant="outlined" 
                        error={passwordError} 
                        helperText={passwordHelper}
                        label="Password" 
                        type={showPassword ? "text" : "password"} 
                        onChange={unhighlight}
                        inputRef={passwordRef}
                        inputProps={passwordInputProps}
                        InputProps={InputPropsPassword}
                    />
                </div>
                <div className={classes.inputArea}>
                    <FormControlLabel 
                        control={<CustomCheckbox inputRef={checkRef}/>}
                        label="Stay signed in"
                    />
                </div>
                <div className={classes.buttonArea}>
                    <CustomButton type="submit" style={{width: "100px"}}>Sign In</CustomButton>
                </div>
            </form>
        </React.Fragment>
    )
}
