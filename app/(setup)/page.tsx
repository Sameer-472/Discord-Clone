import InitialModal from "@/components/modals/InitialModal";
import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation";

const SetUpPage = async()=>{
    const profile = await InitialProfile();

    const server = await db.server.findFirst({
        where: {
            members:{
                some: {
                    profileId: profile?.id
                }
            }
        }
    })

    if(server){
        return redirect(`/server/${server?.id}`)
    }

    return (
        <>
            <InitialModal/>
        </>
    )
}

export default SetUpPage