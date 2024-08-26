'use client'
import { error } from 'console';
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false})
    if (res?.error) {
      toast.error("Something went wrong!")
    } else {
      toast.success("Logged In")
      router.push("/profile")
    }
  }
  return (
    <div className='w-full min-h-screen bg-black flex flex-col selection:text-black selection:bg-white'>
        <h1 className="text-blue-600 font-extrabold tracking-tighter lg:text-2xl p-4 lg:pl-20">Streamly</h1>
        <div className="w-full lg:mt-14 mt-5 h-[30vw] flex lg:flex-row lg:items-center sm:flex-col-reverse">
        <div className="left lg:w-1/2 w-full lg:pl-20 pl-5">
          <h1 className="text-white font-extrabold lg:text-3xl text-2xl">Login your account</h1>
          <form onSubmit={handleSignIn} className="w-3/4 pt-4">
            <div className="email pt-2">
              <label htmlFor="email" className="text-zinc-400 text-sm font-semibold">Email</label>
              <br />
              <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="james@email.com" className="lg:w-[35.2vw] w-[85vw] bg-transparent border-[0.1px] border-zinc-100 px-4 text-sm rounded outline-none py-2 text-white" />
            </div>
            <div className="password pt-2">
              <label htmlFor="password" className="text-zinc-400 text-sm font-semibold">Password</label>
              <br />
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="................." className="lg:w-[35.2vw] w-[85vw] bg-transparent border-[0.1px] border-zinc-100 px-4 text-sm rounded outline-none py-2 text-white" />
            </div>
            <p className="pt-4 text-zinc-400 lg:text-sm text-[10px] w-[85vw]">I have read the user agreement and i agree to the rules and regulations.</p>
            <button className="lg:w-[35.3vw] w-[85vw] rounded py-2 text-sm mt-4 text-white bg-blue-600 font-bold">Sign in</button>
          </form>
          <Link href={"/"}><p className='text-zinc-200 mt-4 lg:text-sm lg:ml-28 text-[10px] ml-10'>Dont have an account yet <span className='text-blue-600'>Register</span></p></Link>
        </div>
        <div className="right lg:w-1/2 px-10 pt-4">
          <h1 className="lg:text-[10vw] text-3xl font-extrabold leading-none tracking-tighter text-white">A <span className="text-blue-600">TRUE</span> GAMER.</h1>
        </div>
      </div>
      <div className="footer lg:pt-16 pt-[120vw] w-full -ml-3">
        <h2 className="text-center lg:text-xs text-[10px] text-white">copyright @streamly 2022</h2>
      </div>
    </div>
  )
}

export default SignInPage