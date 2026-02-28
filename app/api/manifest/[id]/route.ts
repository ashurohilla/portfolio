import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 1. Update the type definition for params to be a Promise
export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  // 2. Await the params object
  const { id } = await params;

  const { data: app, error } = await supabase
    .from('apps')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !app) {
    return NextResponse.json({ error: "Build not found" }, { status: 404 });
  }

  const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>${app.url}</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>${app.bundle_id || 'com.example.app'}</string>
        <key>bundle-version</key>
        <string>${app.version || '1.0.0'}</string>
        <key>kind</key>
        <string>software</string>
        <key>title</key>
        <string>${app.name}</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`;

  return new Response(manifestXml, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}