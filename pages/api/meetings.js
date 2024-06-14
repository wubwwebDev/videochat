// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
let orgId = process.env.NEXT_PUBLIC_ORG_ID;
let apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  const auth = Buffer.from(
    "d4a02f53-96de-43c5-b2a5-996d7dfedfef:d8e4c723283d7e7c54d6"
  ).toString("base64");
  console.log("this is oauth:", auth);
  const allMeetingsResp = await fetch(
    `https://api.dyte.io/v2/meetings`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${auth}`,
      },
    }
  );
  const allMeetings = await allMeetingsResp.json();
  console.log("all meetings", allMeetings);
  res.status(200).json({ meetings: allMeetings.data });
};
