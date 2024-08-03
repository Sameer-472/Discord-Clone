import { Profile, Server, Member } from "@prisma/client";

export type ServerwithMemberWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
}