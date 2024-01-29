import { TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import { useAppSelector } from "../store/configureStore";

interface Props extends UseControllerProps {
    label: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    name: string;
}

export default function AppTextInput(props: Props) {
    const { user } = useAppSelector(state => state.account);
    const {fieldState, field} = useController({...props, defaultValue: (user?.roles?.includes('Brand') && props.name === "brand")? user.userName : ''})
    return (
        <TextField
            {...props}
            {...field}
            multiline={props.multiline}
            rows={props.rows}
            type={props.type}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={props.name === "brand" && user?.roles?.includes('Brand')}
        />
    )
}