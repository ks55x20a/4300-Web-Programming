import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {name, username, email, password } = await request.json();
    await connectMongoDB();
    await User.create({name, username, email, password});
    return NextResponse.json({message: "Item added successfully"}, {status: 201});
}