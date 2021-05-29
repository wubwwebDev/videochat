// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
let orgId = process.env.NEXT_PUBLIC_ORG_ID;
let apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const newMeetingResp = await fetch(
    `${baseUrl}/v1/organizations/${orgId}/meeting`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `APIKEY ${apiKey}`,
      },
      body: JSON.stringify({ title: body.title }),
    }
  );
  const newMeeting = await newMeetingResp.json();
  res.status(200).json({ meeting: newMeeting.data.meeting });
};
