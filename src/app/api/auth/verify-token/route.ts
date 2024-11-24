import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Adjust the path to your User model
import connectDB from '@/db/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export async function POST(req: Request) {
    await connectDB();
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1]; // Get token from authorization header

        if (!token) {
            return NextResponse.json({ message: 'Token not provided' }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, JWT_SECRET); // Decode and verify the JWT

        // Fetch user details from the DB using decoded token data (e.g., user ID)
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password field

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user }); // Return user details if token is valid
    } catch (error) {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}
