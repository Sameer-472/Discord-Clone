import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATH (req: Request , {params}: {params : {memberId: string}}){
    try {
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized" , {status: 401})
        }

        const {searchParams} = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if(!serverId){
            return new  NextResponse("Server Id missing" , {status: 401})
        }

        if(!params.memberId){
            return new NextResponse("Member Id missing" , {status: 401})
        }

        const server = await db.server.update({
            where:{
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update:{
                        where:{
                            id: params.memberId,
                            profileId: {
                                not: profile.id
                            }
                        } ,
                        data: {
                            role
                        }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile: true
                    },
                    orderBy:{
                        role: "asc"
                    }
                }
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        return new NextResponse("Internal Server Error" , {status: 500})
    }
}