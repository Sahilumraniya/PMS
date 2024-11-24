import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  return res.status(200).json({ message: "Protected data", user: decoded });
}
