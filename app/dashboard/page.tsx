'use client';
import { Heart, LogOut, MessageCircleMore, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Post {
  image: string;
  description: string;
  createdAt: string;
  firstName: string;
  lastName: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Redirect if the session is not available
    if (status === 'unauthenticated') {
      router.push('/signin');
      toast.error('Login first');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/showposts'); // Replace with your actual API endpoint
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-black flex selection:text-black selection:bg-white">
      {/* Fixed Navbar */}
      <div className="navbar w-[25vw] fixed h-screen border-r-[0.2px] border-zinc-100/20 flex flex-col justify-between mt-14">
        <div className="logo">
          <h1 className="text-blue-600 font-extrabold tracking-tighter text-2xl -mt-10 pl-5">Streamly</h1>
          <div className="links text-white px-5 pt-5 font-bold">
            <Link href="/dashboard">
              <h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Dashboard</h2>
            </Link>
            <Link href="/create">
              <h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Create</h2>
            </Link>
            <Link href="/alerts">
              <h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Alerts</h2>
            </Link>
            <Link href="/profile">
              <h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Profile</h2>
            </Link>
          </div>
        </div>
        <div className="logout">
          <LogOut onClick={() => signOut({ callbackUrl: '/signin' })} color="#ffffff" className="mx-8 mb-20 cursor-pointer" />
        </div>
      </div>

      <div className="posts w-full h-screen overflow-y-scroll px-20 flex flex-col items-center py-4 ml-[25vw]">
        {posts.map((post, index) => (
          <div key={index} className="post1 my-5 w-3/4 flex flex-col shadow-sm shadow-zinc-300 p-4 rounded">
            <div className="user flex items-center">
              <div className="flex justify-center items-center rounded-full border-[2px] border-white">
                <User size={30} color="#ffffff" />
              </div>
              <div className="user-text ml-2">
                <h2 className="text-white font-extrabold">
                  {post.firstName} {post.lastName}
                </h2>
                <p className="text-zinc-400 text-xs leading-none">
                  Posted at {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="description ml-4 mt-2 border-[0.8px] border-white/50 px-4 py-2 rounded">
              <p className="text-white text-xs">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
