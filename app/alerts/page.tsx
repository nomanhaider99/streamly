'use client'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const AlertPage = () => {
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
        <LogOut onClick={()=>signOut({callbackUrl: "/signin"})} color="#ffffff" className="mx-8 mb-20 cursor-pointer" />
      </div>
    </div>

    {/* Scrollable Posts Section */}
    <div className="alerts w-full h-screen overflow-y-scroll px-20 flex flex-col py-4 ml-[25vw]">
      <h1 className='text-white font-extrabold text-5xl'>Alerts</h1>
      <div className="main w-11/12 mt-5 shadow-sm shadow-white py-4 px-4">
        <div className="text-area border-[1px] border-white/70 p-5">
            <p className='text-zinc-400 text-sm'>🚀 Welcome to Streamly!

We’re excited to introduce Streamly, your new go-to social media platform! 🌟

Streamly is a full-stack social media application designed for a seamless and secure experience. You can freely share posts and explore within a highly secure and fully authenticated environment.

Your privacy and security are our top priorities, so rest assured that every interaction is protected with the latest security measures. We’re committed to providing you with a reliable and enjoyable platform to express yourself and connect with others.

Thank you for being a part of Streamly! 🌐
<br />
<span className='font-bold text-white'>Happy posting! 📝</span></p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AlertPage