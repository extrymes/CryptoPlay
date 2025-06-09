import { createUser, getUserByEmail, getUserByUsername } from "@/lib/db/users";
import { hashPassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email().max(50),
  password: z.string().min(6).max(50),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
          details: result.error.errors,
        },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    // Check if user already exists by username
    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          success: false,
          error: "Username is already taken",
        },
        { status: 409 }
      );
    }

    // Check if user already exists by email
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Return success response (without password)
    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
