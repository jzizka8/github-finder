import { Typography, CircularProgress } from "@mui/material";

interface IDisplayDataProps {
    data: any;
    isLoading: boolean;
    isError: boolean;
    component: JSX.Element | JSX.Element[] | null;
    errorText: string;
}

export const DisplayData = (props: IDisplayDataProps) => {
    if (props.isLoading) {
        return <CircularProgress />;
    }
    if (props.isError) {
        return (
            <Typography variant="body1" className="text-red-700">
                {props.errorText}
            </Typography>
        );
    }
    if (!props.data) {
        return <Typography variant="body1">Nothing to display</Typography>;
    }
    return props.component;
};