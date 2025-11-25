import { useState } from "react";
import { Mail, Lock, LogIn, ArrowRight, Shield } from "lucide-react";
import { useRouter } from "next/router";
import { login } from "@/lib/api";




export default function Login() {
 const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");

 


  async function handleLogin(e?: React.FormEvent) {
  e?.preventDefault();
  
  setLoading(true);
  try {
  
  const res = await login({ email, password });
  
  if (!res.data || !res.data.token) {
    console.error("Invalid response from backend:", res.data);
    // alert("Server error: No token received");
    return;
  }

  localStorage.setItem("token", res.data.token);
  router.push("/dashboard");
} catch (err: any) {
  console.error("LOGIN ERROR:", err.response?.data || err);
  // alert("Invalid email or password");
}

}



  return (
    <div className="min-h-screen w-full  flex items-center justify-center px-6 relative overflow-hidden z-4">
      <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
      
    
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse "></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

   
      <div className="relative max-w-md w-full  border rounded-3xl p-8 shadow-2xl">
       
        <div className="text-center mb-8">
          
          <h1 className="text-4xl font-bold  mb-2 bg-clip-text text-black bg-linear-to-r from-white to-blue-200">
            Welcome Back
          </h1>
          <p className="text-gray-700">Login to your crypto tracker</p>
        </div>

      
        <div className="space-y-5">
          
          <div className="relative group">
            <div className={`absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-30' : ''}`}></div>
            <div className="relative flex items-center">
              <Mail className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-blue-400' : 'text-gray-500'}`} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-white/10 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-blue-500/50  transition-all duration-300"
              />
            </div>
          </div>

        
          <div className="relative group">
            <div className={`absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300  ${focusedField === 'password' ? 'opacity-30' : ''}`}></div>
            <div className="relative flex items-center">
              <Lock className={`absolute left-4 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-blue-400' : 'text-gray-500'}`} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-white/10 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-300"
              />
            </div>
          </div>

        
          <div className="text-right">
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </a>
          </div>

         
          <button
            onClick={handleLogin}
            disabled={loading}
            className="group relative w-full py-3.5 bg-white text-black rounded-xl font-semibold shadow-lg shadow-zinc-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2  border-white/30 border-t-white rounded-full animate-spin"></div>
                Logging In...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Login
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-gray-400">or</span>
          </div>
        </div>

       
        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-blsck hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="group-hover:translate-x-1 transition-transform">Continue with Google</span>
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors" href="/signup">
              Sign up
            </a>
          </p>
        </div>

      
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock className="w-3 h-3" />
          <span>Secure login with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
}