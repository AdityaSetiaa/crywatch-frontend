import { useState } from "react";
import { User, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

import { signup } from "@/lib/api";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await signup({ name, email, password });
      const token = res.data?.token || res.data?.access_token;
      
      if (!token) {
        console.error("No token in response:", res.data);
        alert("Signup failed: No token received from server");
        return;
      }

      localStorage.setItem("token", token);
      
      // alert("Account created successfully!");
      router.push("/dashboard");
      
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Could not create account");
    } finally {
      setLoading(false);
    }


  }
  console.log(email, password, name); 
  return (
    <div className="min-h-screen w-full z-4 flex items-center justify-center px-6 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse "></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-md w-full bg-white/5 backdrop-blur-xl border  rounded-3xl p-8 shadow-2xl ">
        <div className="text-center mb-8">
          
          <h1 className="text-4xl font-bold text-black mb-2 bg-clip-text bg-linear-to-r from-zinc-800 to-zinc-900">
            Create Account
          </h1>
          <p className="text-gray-700">Join thousands tracking crypto</p>
        </div>


        <div className="space-y-5">

          <div className="relative group">
            <div className={`absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-30' : ''}`}></div>
            <div className="relative flex items-center ">
              <User className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-purple-400' : 'text-gray-500'}`} />
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-white/10 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-whitetransition-all duration-300"
              />
            </div>
          </div>

          <div className="relative group">
            <div className={`absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-30' : ''}`}></div>
            <div className="relative flex items-center">
              <Mail className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-purple-400' : 'text-gray-500'}`} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className="w-full pl-12 pr-4 py-3.5 bg-white   rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          <div className="relative group">
            <div className={`absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-30' : ''}`}></div>
            <div className="relative flex items-center">
              <Lock className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-purple-400' : 'text-gray-500'}`} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-white/10 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="group relative w-full py-3.5 bg-white hover:from-purple-500 hover:to-pink-500 text-black rounded-xl font-semibold shadow-lg  hover:shadow-purple-500/70 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              <>
                Sign Up
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <a className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors" href="/login">
              Login
            </a>
          </p>
        </div>

       
        <div className="mt-8 flex gap-2 flex-wrap justify-center">
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
            🔒 Secure
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
            ⚡ Instant Setup
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
            🎯 Free Forever
          </div>
        </div>
      </div>
    </div>
  );
}