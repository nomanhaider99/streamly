import Link from 'next/link'
import React from 'react'

const PendingPage = () => {
  return (
    <main className="min-h-screen w-full bg-black flex flex-col selection:text-black selection:bg-white">
      <h1 className="text-blue-600 font-extrabold tracking-tighter lg:text-2xl p-4 lg:pl-20">Streamly</h1>
      <div className="w-full lg:mt-14 mt-5 lg:translate-y-0 sm:translate-y-[35vw] h-[30vw] flex lg:flex-row lg:items-center flex-col">
        <div className="left lg:w-1/2 w-full lg:pl-20 pl-5">
            <h1 className='lg:text-4xl text-4xl font-bold text-white'>Thank you for registering your account.</h1>
            <h4 className='text-slate-200'>Please check your email and complete your verification.</h4>
            <div className="">
                <Link href="https://mail.google.com/mail/u/0/">
                    <button className='bg-blue-600 w-[85vw]  text-white px-6 py-2 font-bold rounded mt-5 lg:w-[42vw]'>open gmail</button>
                </Link>
            </div>
        </div>
        <div className="right lg:w-1/2 w-full px-10">
          <h1 className="text-[10vw] mt-5 font-extrabold leading-none tracking-tighter text-white">A <span className="text-blue-600">TRUE</span> GAMER.</h1>
        </div>
      </div>
      <div className="footer lg:pt-16 pt-[120vw]">
        <h2 className="text-center text-xs text-white">copyright @streamly 2022</h2>
      </div>
    </main>
  )
}

export default PendingPage