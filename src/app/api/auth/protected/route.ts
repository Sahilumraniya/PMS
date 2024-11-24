import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(req: NextRequest) {
  // Extract token from Authorization header
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Authorization token is missing" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }

  return NextResponse.json({ message: "Protected data", user: decoded });
}
