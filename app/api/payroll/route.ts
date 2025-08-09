export async function POST(request: Request) {
  try{
    const DIFY_TOKEN = process.env.DIFY_TOKEN;

    if (!DIFY_TOKEN) {
        throw new Error("Missing DIFY credentials");
    }

    const reqBody = await request.json()
    // console.log(reqBody)
    const url = "https://api.dify.ai/v1/workflows/run"

    const res = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DIFY_TOKEN}`
    },
    body: JSON.stringify(reqBody)
    })

    // TODO - handle error
    const resJSON = await res.json()
    // console.log(resJSON)

    const nextAPIres = {
      status: "success",
      message: "Payroll processed successfully!"
    }

    return new Response(JSON.stringify(nextAPIres));
  }catch(err){
    console.error(err)
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}