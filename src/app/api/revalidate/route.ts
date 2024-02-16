/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {NextResponse} from "next/server";
import {revalidateTag} from "next/cache";

export async function POST(request: Request) {
  const currentdate = new Date();
  const date = currentdate.getDate();
  const month = currentdate.getMonth() + 1;
  const FullYear = currentdate.getFullYear();
  const datetime =
    "Sync at: " +
    date +
    "/" +
    month +
    "/" +
    FullYear +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  const data = await request.json();

  if (data.key !== "secret") return NextResponse.json({success: false});

  if (data.key === "secret") {
    revalidateTag("products");

    return NextResponse.json({success: true, datetime});
  }
}

// fetch("https://restaurancy-pi.vercel.app/api/revalidate", {
//   method: "POST",
//   headers: {"Content-Type": "application/json"},
//   body: JSON.stringify({key: "secret"}),
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error:", error));
