import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false); // hamburger state

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    setLoggedIn(!!token);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/home");
    setOpen(false);
  }

  return (
    <nav className="w-full flex justify-between items-center px-10 py-5 bg-zinc-200/40 backdrop-blur-md fixed top-0 left-0 z-50 shadow-sm">
      {/* Logo */}
      <Link href="/home" className="text-2xl font-semibold text-black">
        CryWatch
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-zinc-800 font-medium">
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
              className="px-4 py-1 rounded duration-500 transition hover:text-red-500 hover:border"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Hamburger Icon (mobile) */}
      <button
        className="md:hidden text-zinc-900"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>

      {open && (
        <div className="absolute top-20 left-0 w-full bg-zinc-200/40 backdrop-blur-xl border-b border-zinc-300 p-6 flex flex-col gap-6 text-zinc-900 font-medium md:hidden z-50 duration-800 ease-in-out animate-[fadeSlideIn_0.3s_ease-out]">

          {!loggedIn && (
            <>
              <Link
                href="/login"
                className="hover:text-blue-400 transition"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="hover:text-blue-400 transition"
                onClick={() => setOpen(false)}
              >
                Signup
              </Link>
            </>
          )}

          {loggedIn && (
            <>
              <Link
                href="/dashboard"
                className="hover:text-blue-400 transition"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                href="/coins"
                className="hover:text-blue-400 transition"
                onClick={() => setOpen(false)}
              >
                Coins
              </Link>

              <button
                onClick={handleLogout}
                className="text-left  hover:text-red-500 transition w-fit hover:border-red-400"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
}
