import { Avatar, Card, CardActionArea, Link, Typography } from "@mui/material"

interface IUserProps {
    login: string,
    avatar_url: string,
    html_url: string,
    bio: string | null,
    blog: string | null,
    followers: number,
    following: number
}

export const User = (props: IUserProps) => {
    return (
        <Card >
            <CardActionArea href={props.html_url} target="blank" className="p-4">
                <div className="flex justify-center">
                    <Avatar alt={props.login}
                        src={props.avatar_url}
                        sx={{ width: 200, height: 200 }} />
                </div>
                <Typography variant="h4" component="h3" > {props.login}</Typography>
                {props.bio && <Typography variant="body1" className="text-gray-600"> {props.bio}</Typography>}
                {props.blog && <Link href={props.blog}>Blog</Link>}
                <div className="flex justify-between mt-2">
                    <Typography variant="body1">
                        <span className="font-bold">{props.followers}</span> followers
                    </Typography>
                    <Typography variant="body1">
                        <span className="font-bold">{props.following}</span> following
                    </Typography>
                </div>
            </CardActionArea>
        </Card>

    )
}