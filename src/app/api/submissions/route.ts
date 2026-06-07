import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const submission = await prisma.submission.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        pathway: body.pathway,
        responses: body.responses,
      },
    });

    return NextResponse.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save submission",
      },
      {
        status: 500,
      }
    );
  }
}
