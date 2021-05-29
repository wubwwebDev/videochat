// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
let orgId = process.env.NEXT_PUBLIC_ORG_ID;
let apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  const allMeetingsResp = await fetch(`${baseUrl}/v1/organizations/${orgId}/meetings`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `APIKEY ${apiKey}`,
    },
  });
  const allMeetings = await allMeetingsResp.json()
  res.status(200).json({ meetings: allMeetings.data.meetings });
};
