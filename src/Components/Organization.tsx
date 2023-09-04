import { Avatar, Card, Typography } from "@mui/material"

interface IOrganizationProps {
    login: string,
    avatar_url: string
    description: string | null
}
export const Organization = (props: IOrganizationProps) => {
    return (
        <Card className="grid grid-cols-2 grid-rows-2 my-2 items-center">
            <Avatar alt={props.login}
                src={props.avatar_url}
                className="row-span-2" />
            <Typography variant="h5" component="h4" > {props.login}</Typography>
            <Typography variant="body1"  > {props.description}</Typography>

        </Card>
    )
}