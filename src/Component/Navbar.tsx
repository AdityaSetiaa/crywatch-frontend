import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" 
      ? localStorage.getItem("token")
      : null;

    setLoggedIn(!!token);
  }, [loggedIn, router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/home");
  }

  return (
    <nav className="w-full flex justify-between items-center px-10 py-5 bg-zinc-200/40 backdrop-blur-md fixed top-0 left-0 z-50 shadow-sm">
      {/* Logo */}
      <Link href="/home" className="text-2xl font-semibold text-black">
        CryWatch
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-zinc-800 font-medium">
        {!loggedIn && (
          <>
            <Link href="/login" className="hover:text-blue-300 transition">
              Login
            </Link>
            <Link href="/signup" className="hover:text-blue-300 transition">
              Signup
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link href="/dashboard" className="hover:text-blue-300 transition">
              Dashboard
            </Link>
            <Link href="/coins" className="hover:text-blue-300 transition">
              Coins
            </Link>
            <button
              onClick={handleLogout}
              className=" px-4 py-1 rounded duration-500 transition hover:text-red-500 hover:border"
            >
              Logout
            </button>
            <div>
            </div>
          </>
        )}
      </div>
      
    </nav>
  );
}
