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
            <h1 className="text-blue-600 font-extrabold tracking-tighter text-2xl p-4 pl-20">Streamly</h1>
            <div className="w-full mt-10 h-[30vw] flex items-center">
                <div className="left w-1/2 pl-20">
                    <h1 className='text-4xl font-bold text-white'>You are almost there</h1>
                    <h4 className='text-slate-200'>Please click the below button to complete your verification.</h4>
                    <button onClick={handleVerify} className='w-full py-2 bg-blue-600 text-white font-bold rounded mt-5'>Verify</button>
                </div>
                <div className="right w-1/2 px-10">
                    <h1 className="text-[10vw] font-extrabold leading-none tracking-tighter text-white">A <span className="text-blue-600">TRUE</span> GAMER.</h1>
                </div>
            </div>
            <div className="footer pt-20">
                <h2 className="text-center text-xs text-white">copyright @streamly 2022</h2>
            </div>
        </main>
    );
};

export default VerificationPage;
