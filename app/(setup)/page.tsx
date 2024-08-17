import InitialModal from "@/components/modals/InitialModal";
import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation";

const SetUpPage = async()=>{
    const profile = await InitialProfile();

    console.log("profile" , profile);
    const server = await db.server.findFirst({
        where: {
            members:{
                some: {
                    profileId: profile?.id
                }
            }
        }
    })

    console.log("serverId" , server)

    if(server){
        return redirect(`/servers/${server?.id}`)
    }

    return (
        <>
            <InitialModal/>
        </>
    )
}

export default SetUpPage