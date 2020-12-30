import {withStyles} from "@material-ui/core/styles";
import {Button, AccordionSummary, ListItemText, TextField, Checkbox} from "@material-ui/core"

/**
 * This file contains various Material UI components that have been customized
 * to suit my design needs.
 */


// Custom Button
export const CustomButton = withStyles({
    root:{
        backgroundColor: "#DE4A09",
        color: "white",
        "&:hover":{
            backgroundColor: "rgba(222, 74, 9, 0.7)"
        },
        "&:focus":{
            outline: "none",
        },
    }
})(Button);
 

// Custom Accordion Summary
export const CustomAccordionSummary = withStyles({
     root:{
      padding: "0 0.5rem"
     }
 })(AccordionSummary);
 

// Custom OK button
export const OKButton = withStyles({
     root:{
         color: "#DE4A09"
     }
})(Button);


// Custom ListItemText
export const CustomListItemText = withStyles({
    root:{
        '& .MuiListItemText-root':{
            fontSize: "10px"
        }
    }
})(ListItemText);


// Custom Input TextField
export const MyInputTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#DE4A09',
        },
      '& .MuiOutlinedInput-root': {

        '&.Mui-focused fieldset': {
          borderColor: '#DE4A09',
        },

      },
    },
})(TextField);


const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#DE4A09',
      },
    },
    checked: {},
   })

export const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);