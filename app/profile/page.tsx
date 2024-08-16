'use client';

import { LogOut, User } from 'lucide-react';
import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const firstName = session?.user.firstName;
  const lastName = session?.user.lastName;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/signin');
    toast.error("Login first");
    return null;
  }

  return (
    <div className="w-full h-screen bg-black flex selection:text-black selection:bg-white">
      {/* Fixed Navbar */}
      <div className="navbar w-[25vw] fixed h-screen border-r-[0.2px] border-zinc-100/20 flex flex-col justify-between mt-14">
        <div className="logo">
          <h1 className="text-blue-600 font-extrabold tracking-tighter text-2xl -mt-10 pl-5">Streamly</h1>
          <div className="links text-white px-5 pt-5 font-bold">
            <Link href={"/dashboard"}><h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Dashboard</h2></Link>
            <Link href={"/create"}><h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Create</h2></Link>
            <Link href={"/alerts"}><h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Alerts</h2></Link>
            <Link href={"/profile"}><h2 className="my-6 hover:bg-zinc-50 hover:text-black px-4 cursor-pointer transition-all py-2 rounded">Profile</h2></Link>
          </div>
        </div>
        <div className="logout">
          <LogOut onClick={() => signOut({ callbackUrl: "/signin" })} color="#ffffff" className="mx-8 mb-20 cursor-pointer" />
        </div>
      </div>

      {/* Profile Main Section */}
      <div className="main w-full h-screen overflow-y-scroll px-20 flex flex-col py-4 ml-[25vw]">
        <div className="profile-header flex items-center justify-center gap-8 mb-10">
          <div className="profile-image relative rounded-full border-4 border-blue-600 p-2 overflow-hidden w-48 h-48 flex justify-center items-center">
            <User size={100} color="#ffffff" />
          </div>
          <div className="profile-info text-white">
            <h1 className="text-5xl font-bold">{firstName} {lastName}</h1>
            <p className="text-lg text-zinc-400">Welcome to your profile</p>
          </div>
        </div>

        <div className="profile-details bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6">User Information</h2>
          <div className="info-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="info-item">
              <label className="block text-zinc-500 text-sm mb-2">Email</label>
              <p className="text-white bg-zinc-800 px-4 py-2 rounded">{email}</p>
            </div>
            <div className="info-item">
              <label className="block text-zinc-500 text-sm mb-2">First Name</label>
              <p className="text-white bg-zinc-800 px-4 py-2 rounded">{firstName}</p>
            </div>
            <div className="info-item">
              <label className="block text-zinc-500 text-sm mb-2">Last Name</label>
              <p className="text-white bg-zinc-800 px-4 py-2 rounded">{lastName}</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
