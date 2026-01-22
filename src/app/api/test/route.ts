import { NextResponse } from "next/server";

export async function GET() {
  let authTestResult = "not tested";

  try {
    // Try to import auth module
    const { auth } = await import("@/lib/auth");
    authTestResult = "auth imported successfully";

    // Try to get session
    const session = await auth();
    authTestResult = session ? "session exists" : "no session (expected for unauthenticated)";
  } catch (error) {
    authTestResult = `auth error: ${error instanceof Error ? error.message : String(error)}`;
  }

  return NextResponse.json({
    status: "ok",
    authTest: authTestResult,
    env: {
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString(),
  });
}
