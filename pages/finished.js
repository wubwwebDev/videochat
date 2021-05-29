import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetings, setMeetings] = useState([]);
  const createMeeting = async () => {
    const meetingResp = await fetch("/api/meeting", {
      method: "POST",
      body: JSON.stringify({
        title: meetingTitle,
      }),
    });
    const meeting = await meetingResp.json();
    setMeetingTitle("");
    await getAllMeetings();
  };

  const getAllMeetings = async () => {
    const meetingsResp = await fetch("/api/meetings");
    const { meetings } = await meetingsResp.json();
    setMeetings(meetings);
  };

  useEffect(() => {
    getAllMeetings();
  }, []);

  const joinAsHost = async (meetingId, roomName) => {
    const joinAsHostResp = await fetch("/api/host", {
      method: "POST",
      body: JSON.stringify({
        meetingId: meetingId,
      }),
    });
    const { auth } = await joinAsHostResp.json();
    sessionStorage.setItem("auth", auth);
    router.push(`/meeting/${meetingId}/room/${roomName}`);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Dyte Next</title>
      </Head>
      <div className="text-3xl">Meeting Ended</div>
    </div>
  );
}