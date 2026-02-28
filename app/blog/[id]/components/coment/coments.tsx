"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useUser } from "@/lib/store/user";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross1Icon, ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { Terminal, Cpu, Send } from "lucide-react";

interface CommentData {
  coment: string;
  coment_id: string;
  created_at: string;
  slug_id: string;
  user_id: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
    email?: string;
  } | null;
}

interface PostCommentData {
  coment: string;
  created_at: string;
  slug_id: string;
  user_id: string;
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Comments = ({ id, toggleCommentSection }: { id: string; toggleCommentSection: () => void }) => {
  const [comments, setComments] = useState<CommentData[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [refresh, setRefresh] = useState(false);
  const user = useUser((state) => state.user);
  const picture = user?.user_metadata?.picture;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!newComment || !user?.id) return;

    const newCommentData: PostCommentData = {
      coment: newComment,
      created_at: new Date().toISOString(),
      slug_id: id,
      user_id: user.id,
    };

    const { error } = await supabase.from("blog_coments").insert([newCommentData]);

    if (error) {
      console.error("Insert failed:", error);
    } else {
      setNewComment("");
      setRefresh((prev) => !prev);
    }
  };

  const readComments = async () => {
    setLoading(true);
    try {
      // First try with profiles join
      const { data, error } = await supabase
        .from("blog_coments")
        .select(`
 *,
 users:user_id (
  full_name,
  avatar_url,
  email
)
`)
        .eq("slug_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Failed to fetch with profiles, trying basic query:", error);
        // Fallback to basic query if profiles join fails
        const { data: basicData, error: basicError } = await supabase
          .from("blog_coments")
          .select("*")
          .eq("slug_id", id)
          .order("created_at", { ascending: false });

        if (basicError) throw new Error(basicError.message);
        setComments(basicData);
      } else {
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readComments();
  }, [id, refresh]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 84600) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full bg-white dark:bg-[#080808] border-l border-zinc-200 dark:border-zinc-800 flex flex-col font-sans transition-colors duration-300">

      {/* Header */}
      <div className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500/10 border border-teal-500/20">
            <Terminal className="w-4 h-4 text-teal-500" />
          </div>
          <div>
            <h1 className="text-xs font-black dark:text-white uppercase tracking-widest">COMMENTS_LOG</h1>
            <p className="text-[10px] font-mono text-zinc-500">
              STATUS: {comments?.length || 0} ENTRIES_FOUND
            </p>
          </div>
        </div>
        <button
          onClick={toggleCommentSection}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
        >
          <Cross1Icon className="w-4 h-4" />
        </button>
      </div>

      {/* Comment Form */}
      <div className="px-6 py-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10">
        {user?.id ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={picture || ""}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 grayscale"
                />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-teal-500 border-2 border-white dark:border-black"></div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-tighter text-zinc-600 dark:text-zinc-400">
                User.Session: Active
              </span>
            </div>

            <div className="space-y-3">
              <Input
                type="text"
                placeholder="EXECUTE COMMENT..."
                value={newComment}
                onChange={handleInputChange}
                className="bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 focus:border-teal-500 rounded-none h-11 text-xs font-mono"
              />
              <Button
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="w-full bg-teal-500 hover:bg-teal-600 text-black font-black text-xs rounded-none uppercase tracking-widest"
              >
                <Send size={14} className="mr-2" />
                Commit_Comment
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-zinc-300 dark:border-zinc-800">
            <Cpu className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase mb-4">Auth required for read/write</p>
            <Link href="/login">
              <Button variant="outline" className="text-[10px] font-mono uppercase tracking-widest border-teal-500/50 text-teal-500 hover:bg-teal-500/10">
                Initialize_Auth
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-1 w-24 bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative">
              <div className="absolute inset-0 bg-teal-500 animate-[progress_1.5s_infinite]" />
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Loading_Logs...</p>
          </div>
        ) : comments?.length ? (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {comments.map((item, index) => (
              <div key={item.coment_id} className="px-6 py-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                          {item.profiles?.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-tight">
                          {item.profiles?.full_name || 'Anonymous_Node'}
                        </p>
                        <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">
                          Timestamp: {formatTimeAgo(item.created_at)}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-600">ID: {index + 1}</span>
                  </div>

                  <div className="pl-11">
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
                      {item.coment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 opacity-40">
            <ChatBubbleIcon className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-4" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center">Empty_Log: Be the first to push</p>
          </div>
        )}
      </div>

      {/* <style jsx global>{`
        @keyframes progress {
            0% { left: -100%; width: 30%; }
            100% { left: 100%; width: 30%; }
        }
      `}</style> */}
    </div>
  );
};

export default Comments;