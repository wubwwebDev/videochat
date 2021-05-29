import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { DyteMeeting } from "dyte-client";
import { useRouter } from "next/router";

export default function Meeting({ org, base }) {
  const router = useRouter();
  const [auth, setAuth] = useState();
  const [loaded, setLoaded] = useState(false);
  const meetingId = router.query.meetingId;
  const roomName = router.query.roomName;

  const onDyteInit = (meeting) => {
    //meeting ended event
    meeting.on(meeting.Events.meetingEnded, () => {
      sessionStorage.clear();
      router.push("/finished");
    });
  };

  const joinAsParticipant = useCallback(async () => {
    const joinAsParticipantResp = await fetch("/api/participant", {
      method: "POST",
      body: JSON.stringify({
        meetingId: meetingId,
      }),
    });
    const { auth } = await joinAsParticipantResp.json();
    sessionStorage.setItem("auth", auth);
    setAuth(auth);
  }, [meetingId, roomName]);

  useEffect(() => {
    setAuth(sessionStorage.getItem("auth"));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!auth && loaded) {
      joinAsParticipant();
    }
  }, [auth, loaded]);

  return (
    <>
      {auth && (
        <DyteMeeting
          onInit={onDyteInit}
          clientId={org}
          meetingConfig={{
            roomName: roomName,
            authToken: auth,
            apiBase: base,
          }}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      org: process.env.NEXT_PUBLIC_ORG_ID,
      base: process.env.NEXT_PUBLIC_BASE_URL,
    }, // will be passed to the page component as props
  };
}
