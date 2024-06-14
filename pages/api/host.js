// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
let orgId = process.env.NEXT_PUBLIC_ORG_ID;
let apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  console.log("this is as a host");
  const auth = Buffer.from(
    "d4a02f53-96de-43c5-b2a5-996d7dfedfef:d8e4c723283d7e7c54d6"
  ).toString("base64");
  const body = JSON.parse(req.body);
  const meetingId = body.meetingId;
  console.log("this is mmeting id:", meetingId);
  const randId = Math.random().toString(36).substring(7);
  const reqBody = {
    custom_participant_id: randId,
    name: "Host",
    preset_name: "group_call_host",
  };
  const joinMeetingResp = await fetch(
    `https://api.dyte.io/v2/meetings/${meetingId}/participants`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(reqBody),
    }
  );
  const joinMeeting = await joinMeetingResp.json();
  console.log("this is join meetng:", joinMeeting);
  res.status(200).json({ auth: joinMeeting });
};
