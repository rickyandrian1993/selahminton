import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const envUsername = process.env.AUTH_USERNAME ?? "";
    const envPassword = process.env.AUTH_PASSWORD ?? "";

    function safeEqual(a: string, b: string) {
      const bufA = Buffer.from(a, "utf8");
      const bufB = Buffer.from(b, "utf8");
      if (bufA.length !== bufB.length) return false;
      return crypto.timingSafeEqual(bufA, bufB);
    }

    const userOk = safeEqual(username ?? "", envUsername);
    const passOk = safeEqual(password ?? "", envPassword);
    
    if (userOk && passOk) {
      return NextResponse.json(
        { ok: true, message: "Logged in" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { ok: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in auth route:", error);
    return NextResponse.json({ ok: false, message: "Bad request" }, { status: 400 });
  }
}
