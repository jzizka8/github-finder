import { Card, CardActionArea, Typography } from "@mui/material"

interface IRepositoryProps {
    name: string,
    html_url: string,
    created_at: string,
    stargazers_count: number,
    forks_count: number,
    description: string | null,
    language: string | null
}

export const Repository = (props: IRepositoryProps) => {
    return (
        <Card className="my-2">
            <CardActionArea href={props.html_url} target="blank" className="flex flex-col items-start p-2">
                <Typography variant="h6" component="h3" > {props.name}</Typography>
                <Typography variant="body1" className="text-gray-600" > {props.description}</Typography>
                <div className="flex gap-3 mt-2">
                    {props.language &&
                        <Typography variant="body1" className="text-green-600">
                            {props.language}
                        </Typography>
                    }
                    <Typography variant="body1">
                        <span className="font-bold">{props.stargazers_count}</span> Stargazers
                    </Typography>
                    <Typography variant="body1">
                        <span className="font-bold">{props.forks_count}</span> forks
                    </Typography>
                </div>
            </CardActionArea>
        </Card>
    )
}

