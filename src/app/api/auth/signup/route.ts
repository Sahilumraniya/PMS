import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User'; // Adjust the path to your User model
import connectDB from '@/db/mongodb';

export async function POST(req: Request) {
    await connectDB();
    const { name, email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    0
    return NextResponse.json({ message: 'User created successfully' });
}
