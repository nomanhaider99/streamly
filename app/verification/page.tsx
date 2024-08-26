'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const VerificationPage = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
        // Retrieve query parameters directly from URL
        const url = new URL(window.location.href);
        const emailParam = url.searchParams.get('email');

        if (emailParam) {
            setEmail(emailParam);
        }

        setLoading(false);
    }, []);

    const handleVerify = async () => {
        if (!email) {
            toast.error("Email is required for verification.");
            return;
        }

        const res = await fetch('/api/verify', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (res.ok) {
            const data = await res.json();
            toast.success("user verified succesfully")
            router.push("/signin")
        } else {
            const error = await res.json();
            toast.error(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <main className="min-h-screen w-full bg-black flex flex-col selection:text-black selection:bg-white">
        <h1 className="text-blue-600 font-extrabold tracking-tighter lg:text-2xl p-4 lg:pl-20">Streamly</h1>
        <div className="w-full lg:mt-14 mt-5 lg:translate-y-0 sm:translate-y-[35vw] h-[30vw] flex lg:flex-row lg:items-center flex-col">
          <div className="left lg:w-1/2 w-full lg:pl-20 pl-5">
              <h1 className='lg:text-4xl text-4xl font-bold text-white'>You are almost there.</h1>
              <h4 className='text-slate-200'>Please click the below button to complete your verification.</h4>
              <div className="">
            <button onClick={handleVerify} className='bg-blue-600 w-[85vw]  text-white px-6 py-2 font-bold rounded mt-5 lg:w-[42vw]'>verify</button>
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
    );
};

export default VerificationPage;
