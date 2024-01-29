import { toast } from "react-toastify";
import Grid2 from "@mui/material/Unstable_Grid2";
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from "@mui/material";
import { useQuery } from "../../app/hooks/useQuery";
import agent from "../../app/api/agent";

export default function RegisterSuccess() {
    const email = useQuery().get("email") as string;

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirmationLink(email).then(() => {
            toast.success("Email confirmation resent - please check your inbox");
        }).catch(error => console.log(error));
    }

    return (
        <Grid2 container lg={12} height="80vh" display="flex" alignItems="center" justifyContent="center">
            <Grid2 lg={12} textAlign="center">
                <CheckIcon sx={{ fontSize: 100, color: "#ED7D31", }} />
                <Typography
                    sx={{
                        fontFamily: "Montserrat, serif",
                        fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1rem", lg: "2rem" },
                        fontStyle: "italic",
                        color: "text.primary",
                        marginTop: "20px",
                    }}
                >
                    Thank you for registering! Please check your email to confirm your account.
                </Typography>
            </Grid2>
            <Grid2 lg={12} textAlign="center">
                <Typography
                    sx={{
                        fontFamily: "Montserrat, serif",
                        fontSize: { xs: "1rem", sm: "1rem", md: "1.25rem", lg: "1.5rem" },
                    }}
                >
                    Didn't receive the email? Click <span onClick={handleConfirmEmailResend} style={{color: "blue", cursor: "pointer"}}>here</span> to resend.
                </Typography>
            </Grid2>
        </Grid2>
    );
}