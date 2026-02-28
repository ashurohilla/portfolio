"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IAuthor, IBlog } from "@/lib/types";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { ShareIcon, CopyIcon, TwitterIcon, LinkedinIcon } from "lucide-react";
import dynamic from 'next/dynamic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SITE_URL } from "@/app/config";
import { toast } from "@/components/ui/use-toast";

const Comments = dynamic(() => import('./coment/coments'), { ssr: false });

interface Props {
  blog: IBlog;
  author: IAuthor;
}

export default function Content({ blog, author }: Props) {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const blogUrl = `https://${SITE_URL}blog/${blog?.slug}`;

  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${blogUrl}&text=${encodeURIComponent(blog?.title || '')}`, "_blank");
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?url=${blogUrl}&title=${encodeURIComponent(blog?.title || '')}`, "_blank");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast({ description: "Link copied to clipboard" });
    } catch (err) { console.error(err); }
  };

  const toggleCommentSection = () => setIsCommentSectionOpen(!isCommentSectionOpen);

  return (
    <div className=" bg-white dark:bg-zinc-900/10">
      
      {/* SIMPLE HERO SECTION */}
      <div className="max-w-5xl mx-auto px-6 pt-2 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {blog?.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium whitespace-nowrap mb-2">
            Last Updated: {new Date(blog?.created_at!).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* AUTHOR & SOCIALS */}
        <div className="flex items-center gap-2">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <Image 
              src={author?.profile} 
              alt={author?.Name} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
              {author?.Name}
            </h3>
            <div className="flex items-center gap-4">
              <Link href={author?.linkdin || "#"} target="_blank" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <BsLinkedin size={18} />
              </Link>
              <Link href={author?.twiter || "#"} target="_blank" className="text-zinc-500 hover:text-[#FF0000] transition-colors">
                <BsTwitter size={20} />
              </Link>
              <Link href={author?.github || "#"} target="_blank" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <BsGithub size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* INTERACTION BAR */}
        <div className="sticky top-24 z-20 flex items-center justify-between border-y border-zinc-100 dark:border-zinc-800 py-4 my-8 bg-white/80 dark:bg-zinc-900/10 backdrop-blur-md">
            <button
              onClick={toggleCommentSection}
              className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-teal-500 transition-all text-sm font-medium"
            >
              <AiOutlineComment size={20} />
              <span>Comments</span>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all text-sm font-medium focus:outline-none">
                <ShareIcon className="w-4 h-4" />
                Share
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl">
                <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer gap-2">
                  <CopyIcon size={14} /> Copy Link
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-zinc-800" />
                <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer gap-2">
                  <TwitterIcon size={14} /> Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareOnLinkedIn} className="cursor-pointer gap-2">
                  <LinkedinIcon size={14} /> LinkedIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {/* COMMENTS SIDEBAR */}
      <div
        className={`fixed inset-y-0 right-0 z-[100] w-[370px] bg-white dark:bg-[#080808] border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isCommentSectionOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Comments id={blog?.slug} toggleCommentSection={toggleCommentSection} />
      </div>

      {isCommentSectionOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]" onClick={toggleCommentSection} />
      )}
    </div>
  );
}