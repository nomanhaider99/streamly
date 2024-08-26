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
    const res = await fetch('/api/signup', {
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
    <main className="min-h-screen w-full bg-black flex flex-col selection:text-black selection:bg-white">
      <h1 className="text-blue-600 font-extrabold tracking-tighter lg:text-2xl p-4 lg:pl-20 ">Streamly</h1>
      <div className="w-full lg:mt-14 mt-5 h-[30vw] flex lg:flex-row lg:items-center sm:flex-col-reverse">
        <div className="left lg:w-1/2 w-full lg:pl-20 pl-5">
          <h1 className="text-white font-extrabold lg:text-3xl text-2xl">Register your account</h1>
          <form onSubmit={handleSubmit} className="w-3/4 pt-4">
            <div className="names lg:flex lg:items-center w-full ">
              <div className="first">
                <label htmlFor="firstName" className="text-zinc-400 text-sm font-semibold">First name</label>
                <br />
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  value={firstName}
                  type="text"
                  placeholder="James"
                  className="bg-transparent capitalize border-[0.1px] border-zinc-100 px-4 lg:text-sm text-xs rounded outline-none py-2 text-white w-[85vw] lg:w-[17.7vw]"
                />
              </div>
              <div className="last lg:ml-4">
                <label htmlFor="lastName" className="text-zinc-400 text-sm font-semibold">Last name</label>
                <br />
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  value={lastName}
                  type="text"
                  placeholder="Wanny"
                  className="bg-transparent capitalize border-[0.1px] border-zinc-100 px-4 lg:text-sm text-xs rounded outline-none py-2 text-white w-[85vw] lg:w-[17.7vw]"
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
                className="lg:w-[36.8vw] w-[85vw] lowercase bg-transparent border-[0.1px] border-zinc-100 px-4 xl:text-sm text-xs rounded outline-none py-2 text-white"
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
                className="lg:w-[36.8vw] w-[85vw] bg-transparent border-[0.1px] border-zinc-100 px-4 text-sm rounded outline-none py-2 text-white"
              />
            </div>
            <p className="pt-4 text-zinc-400 lg:text-sm text-[10px] w-[85vw]">I have read the user agreement and I agree to the rules and regulations.</p>
            <button className="lg:w-[36.8vw] w-[85vw] rounded py-2 text-sm mt-4 text-white bg-blue-600 font-bold">Sign up</button>
          </form>
          <Link href={"/signin"}>
            <p className='text-zinc-200 mt-4 lg:text-sm lg:ml-28 text-[10px] ml-10'>Already have an account? <span className='text-blue-600'>Login</span></p>
          </Link>
        </div>
        <div className="right lg:w-1/2 px-10 pt-4">
          <h1 className="lg:text-[10vw] text-3xl font-extrabold leading-none tracking-tighter text-white">A <span className="text-blue-600">TRUE</span> GAMER.</h1>
        </div>
      </div>
      <div className="footer lg:pt-16 pt-[124vw] w-full -ml-3">
        <h2 className="text-center lg:text-xs text-[10px] text-white">copyright @streamly 2022</h2>
      </div>
    </main>
  );
}
