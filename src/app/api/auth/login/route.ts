import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Adjust the path to your User model
import connectDB from '@/db/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export async function POST(req: Request) {

    await connectDB();

    const { email, password } = await req.json();

    // Find user by email
    console.log("Email :: ", email);

    const user = await User.findOne({ email });
    console.log("User :: ", user);
    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id }, // Store user ID in the token
        JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    // Send the token back to the client
    return NextResponse.json({ token });
}
