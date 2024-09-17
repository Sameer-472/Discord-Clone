"use client";

import { useState, useEffect } from "react";
import CreateServerModal from "../modals/create-server-modal";
import InviteModal from "../modals/Invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import MembersModal from "../modals/members-modal";
import CreateChannelModal from "../modals/create-channel-modal";
import LeaveModal from "../modals/leaveServer";
import DeleteServer from "../modals/deleteServer";
import DeleteChannel from "../modals/delete-channel-modal";

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (

        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal/>
            <CreateChannelModal/>
            <MembersModal/>
            <LeaveModal/>
            <DeleteServer/>
            <DeleteChannel/>
        </>

    )
}