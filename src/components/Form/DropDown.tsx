import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

export interface DropDownListProps {
    onChange: any;
    styles?: any;
    values: string [];
    initialValue: string;
   
}

const DropDownList: React.SFC<DropDownListProps> = ({values, onChange, styles, initialValue}) => {
    const [value, setvalue] = useState<string>(initialValue);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    }

    const handleChange = (value: any) => {
        onChange(value);
        setvalue(value);
    }

    
    
    return (
        <FormControl variant="outlined" className = {styles}>
           
            <Select
                value= {value}
                onChange= {(eve) => handleChange(eve.target.value)}
                MenuProps = {MenuProps}
            >    
        
                {values ?   values.map((value: string, index: number) => {
                    return (
                        <MenuItem key = {index} value={value}>{value}</MenuItem>
                    );
                }) : null}
            
              
            </Select>
        </FormControl>
    );
}

export default DropDownList;
