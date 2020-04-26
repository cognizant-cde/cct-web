import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';


export interface TextBoxProps {
    readOnly: boolean;
    styles: any;
    onChange: any;
    textValue: string;
    placeholder: string;
}

/*
Textbox that allows users to add inputs into the text field, can be made read-only 
and default values can be set, styles can also be passed in as props 
*/
const TextBox: React.SFC<TextBoxProps> = ({placeholder, readOnly, styles, onChange, textValue }) => {
    const [value, setValue] = useState<string>("");

    // if fields are readonly and some value needs to be prepopulated in the textfield 
    useEffect(
        () => {
           if(textValue !== "") {
               setValue(textValue);
           }
        },
        [textValue]
    ); 

    const handleTextValue = (value: string) => {
        onChange(value);
        setValue(value);
    }

    return (
        <TextField variant="standard"
            InputProps={{
                readOnly: readOnly,
            }} 
            placeholder = {placeholder}
            className={styles} 
            onChange = {(eve) => handleTextValue(eve.target.value)}
            value = {value}
            required
            />
    );
}

export default TextBox;