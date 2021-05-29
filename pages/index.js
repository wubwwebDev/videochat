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
    console.log(meetings);
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
      <div className="text-3xl">Meeting Tings</div>
      <div className="flex mt-2">
        <input
          type="text"
          className="p-1 border rounded"
          placeholder="Meeting Title"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded text-white p-2 ml-4"
          onClick={createMeeting}
        >
          Create Room
        </button>
      </div>
      <div className="mt-8 text-xl mb-4">Existing Meetings</div>
      {meetings.map((meeting) => (
        <div key={meeting.roomName} className="flex mb-2">
          <div className="mr-2">
            {meeting.title ? meeting.title : meeting.roomName}
          </div>
          <button
            className="bg-blue-500 rounded text-white p-1 text-sm"
            onClick={() => joinAsHost(meeting.id, meeting.roomName ?? "")}
          >
            Join as Host
          </button>
        </div>
      ))}
    </div>
  );
}