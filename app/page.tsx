'use client'
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required!")
    }
    const res = await fetch('http://localhost:3000/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    });
    if (res.ok) {
      const form = e.target;
      form.reset();
      toast.success("user created succesfully");
      router.push("/pending");
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  }

  return (
    <main className=" min-h-screen w-full  bg-black flex flex-col selection:text-black selection:bg-white">
      
      <h1 className="text-blue-600 font-extrabold tracking-tighter text-2xl p-4 pl-20">Streamly</h1>
      <div className="w-full mt-10 h-[30vw] flex items-center">
        <div className="left w-1/2 pl-20">
          <h1 className="text-white font-extrabold text-3xl">Register your account</h1>
          <form onSubmit={handleSubmit} className="w-3/4 pt-4">
            <div className="names flex items-center w-full ">
              <div className="first">
                <label htmlFor="firstName" className="text-zinc-400 text-sm font-semibold">First name</label>
                <br />
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  value={firstName}
                  type="text"
                  placeholder="James"
                  className="bg-transparent capitalize border-[0.1px] border-zinc-100 px-4 text-sm rounded outline-none py-2 text-white"
                />
              </div>
              <div className="last ml-4">
                <label htmlFor="lastName" className="text-zinc-400 text-sm font-semibold">Last name</label>
                <br />
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  value={lastName}
                  type="text"
                  placeholder="Wanny"
                  className="bg-transparent capitalize border-[0.1px] border-zinc-100 px-4 text-sm rounded outline-none py-2 text-white"
                />
              </div>
            </div>
            <div className="email pt-2 w-full">
              <label htmlFor="email" className="text-zinc-400 text-sm font-semibold">Email</label>
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                type="text"
                placeholder="james@email.com"
                className="w-[36.8vw] lowercase bg-transparent border-[0.1px] border-zinc-100 px-4 text-sm rounded outline-none py-2 text-white"
              />
            </div>
            <div className="password pt-2">
              <label htmlFor="password" className="text-zinc-400 text-sm font-semibold">Password</label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                type="password"
                placeholder="................."
                className="w-[36.8vw] bg-transparent border-[0.1px] border-zinc-100 px-4 text-sm rounded outline-none py-2 text-white"
              />
            </div>
            <p className="pt-4 text-zinc-400 text-sm">I have read the user agreement and I agree to the rules and regulations.</p>
            <button className="w-[36.8vw] rounded py-2 text-sm mt-4 text-white bg-blue-600 font-bold">Sign up</button>
          </form>
          <Link href={"/signin"}>
            <p className='text-zinc-200 mt-4 text-sm ml-28'>Already have an account? <span className='text-blue-600'>Login</span></p>
          </Link>
        </div>
        <div className="right w-1/2 px-10">
          <h1 className="text-[10vw] font-extrabold leading-none tracking-tighter text-white">A <span className="text-blue-600">TRUE</span> GAMER.</h1>
        </div>
      </div>
      <div className="footer pt-16">
        <h2 className="text-center text-xs text-white">copyright @streamly 2022</h2>
      </div>
    </main>
  );
}
