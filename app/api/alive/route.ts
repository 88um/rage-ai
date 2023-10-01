import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        //console.log(req)
      let response
      const alive = await prismadb.alive.findFirst({});
      if (!alive) {
        response = await prismadb.alive.create({
          data: {
            count: 0,
          },
        });
      }
      else{
          response = await prismadb.alive.update({
              where: {
                  id: alive.id!,
              },
              data:{
                  count: alive.count+1
              }
          })
      }
      return NextResponse.json(response);
    } catch (error) {
      console.log("[ALIVE_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  