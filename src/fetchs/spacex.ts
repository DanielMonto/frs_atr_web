import { type ApiSpaceXResponse, type Doc } from "../types/api"

export const getLaunchById=async (id:string)=>{
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}/`)
    const launch=(await res.json()) as Doc
    return launch
}
export const getLatestLaunchesIds=async()=>{
    const launches=await getLatestsLaunches()
    const launches_ids=launches.map(launch=>{
        return launch.id
    })
    return launches_ids
}
export const getLatestsLaunches=async()=>{
    const res = await fetch('https://api.spacexdata.com/v5/launches/query/',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            query:{},
            options:{
                sort:{
                    date_unix:'asc'
                },
                limit:12
            }
        })
    })
    const {docs:launches} = await res.json() as ApiSpaceXResponse
    return launches
}