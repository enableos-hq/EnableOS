import { NextResponse } from 'next/server'

export async function GET(request) {
  const { origin } = new URL(request.url)
  // Implicit flow handles session via URL hash on the client
  // Just redirect to /app and let the onAuthStateChange listener pick up the session
  return NextResponse.redirect(`${origin}/app`)
}
