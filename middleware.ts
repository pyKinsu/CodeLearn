import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔥 Allow PDFs to pass through untouched
  if (pathname.startsWith('/pdf/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
