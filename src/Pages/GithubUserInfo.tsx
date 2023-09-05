import { CircularProgress, TextField, Typography } from "@mui/material"
import { Organization } from "../Components/Organization"
import { Repository } from "../Components/Repository"
import { User } from "../Components/User"

import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQueries } from "react-query";
import { fetchUserInfo, fetchUserOrgs, fetchUserRepos } from "../services/githubApi";
import { DisplayData } from "../Components/DisplayData";

export const GithubUserInfo = () => {
    const [username, setUsername] = useState("");
    const debouncedUsername = useDebounce(username, 300);

    const [{ data: userData, isLoading: userLoading, isError: userError },
        { data: reposData, isLoading: reposLoading, isError: reposError },
        { data: orgsData, isLoading: orgsLoading, isError: orgsError }] = useQueries([
            {
                queryKey: ['user', debouncedUsername],
                queryFn: async () => {
                    return (await fetchUserInfo(username)).data;
                },
                retry: false
            }, {
                queryKey: ['repos', debouncedUsername],
                queryFn: async () => {
                    return (await fetchUserRepos(username)).data;
                },
                retry: false
            }, {
                queryKey: ['orgs', debouncedUsername],
                queryFn: async () => {
                    return (await fetchUserOrgs(username)).data;
                },
                retry: false
            },
        ]
        )

    return (
        <>
            <Typography variant="body1" >Write a name of the user and discover their repositories.</Typography>
            <TextField id="username" label="Username" variant="standard" type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            <div className="grid sm:grid-cols-[minmax(auto,400px)_minmax(auto,600px)] sm:grid-rows-[auto_1fr] gap-y-2 gap-x-4 my-4">
                <div>
                    <Typography variant="h3" component="h2" className='text-emerald-600 my-2'>User</Typography>
                    {<DisplayData {...{
                        data: userData,
                        isLoading: userLoading,
                        isError: userError,
                        component: <User {...userData} />,
                        errorText: "Error loading user",
                    }} />}
                </div>

                <div className="sm:row-span-2">
                    <Typography variant="h3" component="h2" className='text-emerald-600 my-2'>Repositories</Typography>
                    {<DisplayData {...{
                        data: reposData,
                        isLoading: reposLoading,
                        isError: reposError,
                        component: reposData.map((r) => <Repository {...r} key={r.id} />),
                        errorText: "Error loading repositories",
                    }} />}
                </div>
                <div>
                    <Typography variant="h3" component="h2" className='text-emerald-600 my-2'>Organizations</Typography>
                    {<DisplayData {...{
                        data: orgsData,
                        isLoading: orgsLoading,
                        isError: orgsError,
                        component: orgsData.map((o) => <Organization {...o} key={o.id} />),
                        errorText: "Error loading organizations",
                    }} />}
                </div>
            </div>
        </>
    )
}
