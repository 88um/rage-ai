import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";



const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {prompt}  = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!prompt) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    //const freeTrial = await checkApiLimit();
    //const isPro = await checkSubscription();
    const isPro = true;
    const freeTrial = true;

    if (false && !freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const response = await replicate.run(
      "facebookresearch/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
      {
        input: {
          prompt: prompt,
          model_version: "melody"
        }
      }
    );


    if (false &&!isPro) {
      //await incrementApiLimit();
    }
    //console.log(response)
    return NextResponse.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
