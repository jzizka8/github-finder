import { TextField, Typography } from "@mui/material"
import { Organization } from "../Components/Organization"
import { Repository } from "../Components/Repository"
import { User } from "../Components/User"

import sampleUser from '../SampleData/sampleUser.json';
import sampleOrgs from '../SampleData/sampleOrgs.json';
import sampleRepos from '../SampleData/sampleRepos.json';
import { useState } from "react";

export const GithubUserInfo = () => {
    const [username, setUsername] = useState("");

    return (
        <>
            <Typography variant="body1" >Write a name of the user and discover their repositories.</Typography>
            <TextField id="username" label="Username" variant="standard" type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            <div className="grid sm:grid-cols-[minmax(auto,400px)_minmax(auto,600px)] sm:grid-rows-[auto_1fr] gap-y-2 gap-x-4 my-4">
                <div className="">
                    <Typography variant="h3" component="h2" className='text-emerald-600 my-2'>User</Typography>
                    <User {...sampleUser} />
                </div>

                <div className="sm:row-span-2">
                    <Typography variant="h3" component="h2" className='text-emerald-600 my-2'>Repositories</Typography>
                    {sampleRepos.map((r) => <Repository {...r} key={r.id} />
                    )}
                </div>
                <div className="">
                    <Typography variant="h3" component="h2" className='text-emerald-600 my-2'>Organizations</Typography>
                    {sampleOrgs.map((o) => <Organization {...o} key={o.id} />
                    )}
                </div>
            </div>
        </>
    )
}