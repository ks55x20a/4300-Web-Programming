import { NextResponse } from "next/server";
import User from "@/models/UserSchema";

import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../config/mongodb";

export const POST = async (request: any) => {
    const {name, username, email, password} = await request.json();

  console.log(name, username, email, password);

  await connectMongoDB();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name,
    username,
    password: hashedPassword,
    email
  }
  try {
    await User.create(newUser);
  } catch (e: any) {
    return new NextResponse(e.message, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });

}