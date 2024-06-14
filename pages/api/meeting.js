// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
let orgId = process.env.NEXT_PUBLIC_ORG_ID;
let apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const auth = Buffer.from(
    "d4a02f53-96de-43c5-b2a5-996d7dfedfef:d8e4c723283d7e7c54d6"
  ).toString("base64");

  const newMeetingResp = await fetch(`https://api.dyte.io/v2/meetings`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      title: body.title,
      preferred_region: "ap-south-1",
      record_on_start: false,
    }),
  });
  const newMeeting = await newMeetingResp.json();
  console.log("this is new meeting:::", newMeeting);
  res.status(200).json({ meeting: newMeeting.data.meeting });
};
