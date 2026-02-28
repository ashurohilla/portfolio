import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import AppShareUI from '@/components/AppShareUI';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AppSharePage({ params }: PageProps) {
  // 1. Await params in the Server Component
  const { id } = await params;

  // 2. Fetch the app data
  const { data: app, error } = await supabase
    .from('apps')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !app) {
    notFound();
  }

  // 3. Pass the app data to the Client UI
  return <AppShareUI app={app} />;
}