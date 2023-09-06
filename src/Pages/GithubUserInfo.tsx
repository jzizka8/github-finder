import { TextField, Typography } from "@mui/material"
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
                    if (!username) {
                        return null
                    }
                    return fetchUserInfo(username);
                },
                retry: false,
            }, {
                queryKey: ['repos', debouncedUsername],
                queryFn: async () => {
                    if (!username) {
                        return null
                    }
                    return fetchUserRepos(username);
                },
                retry: false
            }, {
                queryKey: ['orgs', debouncedUsername],
                queryFn: async () => {
                    if (!username) {
                        return null
                    }
                    return fetchUserOrgs(username);
                },
                retry: false,
            },
        ]
        )

    return (
        <>
            <Typography variant="body1" >Write a name of the user and discover their repositories.</Typography>
            <TextField id="username" label="Username" variant="standard" type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2" />
            <div className="grid sm:grid-cols-[minmax(auto,400px)_minmax(auto,600px)] sm:grid-rows-[auto_1fr] gap-y-2 gap-x-4 my-4">
                <div>
                    <Typography variant="h3" component="h2" className='text-emerald-500 my-2'>User</Typography>
                    {<DisplayData {...{
                        data: userData,
                        isLoading: userLoading,
                        isError: userError,
                        component: (userData && <User {...userData} />),
                        errorText: "Error loading user",
                    }} />}
                </div>

                <div className="sm:row-span-2">
                    <Typography variant="h3" component="h2" className='text-emerald-500 my-2'>Repositories</Typography>
                    {<DisplayData {...{
                        data: reposData,
                        isLoading: reposLoading,
                        isError: reposError,
                        component: reposData?.length ?
                            reposData?.map((r) => <Repository {...r} key={r.id} />) :
                            <Typography variant="body1">User has no repositories</Typography>,
                        errorText: "Error loading repositories",
                    }} />}
                </div>
                <div>
                    <Typography variant="h3" component="h2" className='text-emerald-500 my-2'>Organizations</Typography>
                    {<DisplayData {...{
                        data: orgsData,
                        isLoading: orgsLoading,
                        isError: orgsError,
                        component: orgsData?.length ?
                            orgsData?.map((o) => <Organization {...o} key={o.id} />) :
                            <Typography variant="body1">User has no organizations</Typography>,
                        errorText: "Error loading organizations",
                    }} />}
                </div>
            </div>
        </>
    )
}
