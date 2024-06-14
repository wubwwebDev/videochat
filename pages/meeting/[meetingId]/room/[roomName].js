import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
// import { DyteMeeting } from "dyte-client";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { useRouter } from "next/router";
import { useDyteClient } from "@dytesdk/react-web-core";

export default function Meeting() {
  const [meeting, initMeeting] = useDyteClient();
  const org = "d4a02f53-96de-43c5-b2a5-996d7dfedfef";
  const base = "https://api.dyte.io/v2";
  const router = useRouter();
  const [auth, setAuth] = useState();
  const [loaded, setLoaded] = useState(false);
  const meetingId = router.query.meetingId;
  const roomName = router.query.roomName;

  const onDyteInit = (meeting) => {
    console.log("thisis meeting s ondyteInit", meeting);
    //meeting ended event
    meeting.on(meeting.Events.meetingEnded, () => {
      sessionStorage.clear();
      router.push("/finished");
    });
  };

  const joinAsParticipant = useCallback(async () => {
    const auth1 = sessionStorage.getItem("auth");
    setAuth(auth1);
    initMeeting({
      authToken: auth1,
      defaults: {
        audio: false,
        video: false,
      },
    });
    // const joinAsParticipantResp = await fetch("/api/participant", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     meetingId: meetingId,
    //   }),
    // });
    // const { auth } = await joinAsParticipantResp.json();
    // sessionStorage.setItem("auth", auth);
    // setAuth(auth);
  }, [meetingId, roomName]);

  useEffect(() => {
    joinAsParticipant();
  }, []);

  return <>{auth && <DyteMeeting mode="fixed" meeting={meeting} />}</>;
}
