import Link from 'next/link'
import React from 'react'

const PendingPage = () => {
  return (
    <main className="min-h-screen w-full bg-black flex flex-col selection:text-black selection:bg-white">
      <h1 className="text-blue-600 font-extrabold tracking-tighter text-2xl p-4 pl-20">Streamly</h1>
      <div className="w-full mt-10 h-[30vw] flex items-center">
        <div className="left w-1/2 pl-20">
            <h1 className='text-4xl font-bold text-white'>Thank you for registering your account.</h1>
            <h4 className='text-slate-200'>Please check your email and complete your verification.</h4>
            <div className="">
                <Link href="https://mail.google.com/mail/u/0/">
                    <button className='bg-blue-600 text-white px-6 py-2 font-bold rounded mt-5 w-[42vw]'>open gmail</button>
                </Link>
            </div>
        </div>
        <div className="right w-1/2 px-10">
          <h1 className="text-[10vw] font-extrabold leading-none tracking-tighter text-white">A <span className="text-blue-600">TRUE</span> GAMER.</h1>
        </div>
      </div>
      <div className="footer pt-16">
        <h2 className="text-center text-xs text-white">copyright @streamly 2022</h2>
      </div>
    </main>
  )
}

export default PendingPage