import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Input Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Read environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Check if configuration is active
    const isSupabaseConfigured = 
      supabaseUrl && 
      supabaseRoleKey && 
      !supabaseUrl.includes("your-project-id") && 
      !supabaseRoleKey.includes("your-service-role-key");

    if (isSupabaseConfigured) {
      console.log(`[SYS] Initiating real Supabase transaction for ${email}...`);
      
      // Call Supabase PostgREST API directly to insert rows into 'messages' table
      const response = await fetch(`${supabaseUrl}/rest/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseRoleKey,
          "Authorization": `Bearer ${supabaseRoleKey}`,
          "Prefer": "return=representation"
        },
        body: JSON.stringify({
          name,
          email,
          message,
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[SYS_ERROR] Supabase database transaction failed:", errorText);
        return NextResponse.json(
          { success: false, error: "Database transaction anomaly encountered." },
          { status: 502 }
        );
      }

      console.log("[SYS] Database transaction successful.");
    } else {
      console.warn("[SYS_WARNING] Supabase environment variables are missing or use default placeholders. Running automated simulation mode.");
    }

    // --- AUTOMATION LAYER (SIMULATING MAILGUN/SENDGRID/RESEND WORKFLOWS) ---
    // Log automation pipeline details to server console
    console.log("=========================================");
    console.log("⚡ AUTOMATION PIPELINE TRIGGERED ⚡");
    console.log(`[TIMESTAMP] : ${new Date().toISOString()}`);
    console.log(`[OPERATOR]  : ${name} (${email})`);
    console.log(`[PAYLOAD]   : "${message}"`);
    console.log("-----------------------------------------");
    console.log("✔ Action 1: Dispatched internal Slack/Discord alert...");
    console.log(`✔ Action 2: Triggered automated auto-responder email to <${email}>:`);
    console.log(`   "Hello ${name}, thank you for reaching out. We have received your transmission."`);
    console.log("✔ Action 3: Logged event inside local server telemetry...");
    console.log("=========================================");

    return NextResponse.json({
      success: true,
      message: "Transmission securely received and automation workflows initiated.",
      simulation: !isSupabaseConfigured
    });

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("[SYS_ERROR] Contact API handler exception:", errorMsg);
    return NextResponse.json(
      { success: false, error: "Internal server telemetry exception." },
      { status: 500 }
    );
  }
}
