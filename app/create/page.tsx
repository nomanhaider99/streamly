'use client';

import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';

const CreatePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      toast.error('Login first');
    }
  }, [status, router]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!description || !session?.user?.email) {
      toast.error('Description and email are required.');
      return;
    }

    try {
      const response = await fetch('/api/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          description,
          image: selectedImage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Post created successfully!');
        setDescription('');
        setSelectedImage(null);
      } else {
        console.error('Error:', data.error);
        alert(`Failed to create post: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An unexpected error occurred.');
    }
  };

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

      {/* Create Post Section */}
      <div className="create w-full h-screen overflow-y-scroll px-20 flex flex-col py-20 ml-[25vw]">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="section w-3/4 px-5 py-4 shadow-sm shadow-zinc-200/50 rounded relative">
            {/* Image Preview Section */}
            {selectedImage && (
              <div className="image-sect w-full rounded mb-4">
                <Image src={selectedImage} alt="Selected" width={600} height={400} className="rounded" />
              </div>
            )}
            <div className="flex items-center justify-center rounded bg-gray-900">
              <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg">
                <label htmlFor="description" className="block text-lg font-semibold text-white mb-2">Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="description"
                  className="w-full bg-transparent text-white border border-gray-100 rounded-lg h-32 p-4 resize-none outline-none transition"
                  placeholder="Write your detailed description here..."
                ></textarea>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 py-2 px-10 rounded text-white font-bold mt-4 ml-[33vw] transition-all"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
