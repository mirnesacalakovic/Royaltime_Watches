import { FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    label: string;
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({items, checked, onChange, label}:  Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);
    
    function handleChecked(value: string){
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if(currentIndex === - 1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            {items.map(item => (
                <FormControlLabel 
                sx={{
                    color: "text.primary"
                }}
                control={<Checkbox 
                    checked={checkedItems.indexOf(item)!== -1}
                    onClick={() => handleChecked(item)}
                    color="secondary"
                />} 
                label={item}
                key={item}
                />
            ))}
        </FormGroup> 
    )
}