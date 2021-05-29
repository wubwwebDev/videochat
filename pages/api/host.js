// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
let orgId = process.env.NEXT_PUBLIC_ORG_ID;
let apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const meetingId = body.meetingId;
  const randId = Math.random().toString(36).substring(7);
  const reqBody = {
    clientSpecificId: randId,
    userDetails: {
      name: "Host",
    },
    roleName: "host",
  };
  console.log(JSON.stringify(reqBody));
  const joinMeetingResp = await fetch(
    `${baseUrl}/v1/organizations/${orgId}/meetings/${meetingId}/participant`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `APIKEY ${apiKey}`,
      },
      body: JSON.stringify(reqBody),
    }
  );
  const joinMeeting = await joinMeetingResp.json();
  res.status(200).json({ auth: joinMeeting.data.authResponse.authToken });
};
