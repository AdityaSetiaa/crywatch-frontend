'use client'
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Github, Eye, Bell } from 'lucide-react';
import Link from 'next/link';


export default function Home() {
  interface FloatingCoin {
    id: number;
    x: number;
    y: number;
    icon: string;
    duration: number;
    delay: number;
    scale: number;
  }

  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cryptoIcons = ['₿', 'Ξ', '◎', '⟠', '₳', '⬡'];
  
  const trendingCoins = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$94,234', change: '+5.2%', positive: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,421', change: '+3.8%', positive: true },
    { symbol: 'SOL', name: 'Solana', price: '$245', change: '-1.2%', positive: false },
  ];

  useEffect(() => {
    const coins = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: cryptoIcons[Math.floor(Math.random() * cryptoIcons.length)],
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setFloatingCoins(coins);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full flex mb-9 flex-col overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>
      
      {floatingCoins.map((coin) => (
        <div
          key={coin.id}
          className="absolute z-4 text-black/ text-4xl font-bold pointer-events-none"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
            animation: `float ${coin.duration}s ease-in-out infinite`,
            animationDelay: `${coin.delay}s`,
            transform: `scale(${coin.scale})`,
          }}
        >
          {coin.icon}
        </div>
      ))}

      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-100 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      <main className="flex flex-col items-center justify-center text-center flex-1 px-6 relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2  backdrop-blur-sm border  rounded-full  text-sm animate-pulse">
          
          <span>Real-time Market Data</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold drop-shadow-2xl mb-2 bg-clip-text text-black animate-[shimmer_3s_ease-in-out_infinite]">
          Your Personal Crypto Tracker
        </h1>

        <p className="text-gray-900 text-lg mt-6 max-w-2xl drop-shadow leading-relaxed">
          Discover real-time cryptocurrency prices and build your own watchlist.
          Stay ahead with live market trends and instant alerts.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center max-w-4xl">
          {trendingCoins.map((coin, index) => (
            <div
              key={coin.symbol}
              className="group px-6 py-4 bg-white/5 backdrop-blur-md border  rounded-2xl hover:bg-white/10 hover:border-zinc-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-zinc-500/20 shadow-sm flex "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-zinc-500 to-zinc-900 rounded-full flex items-center justify-center text-white font-bold">
                  {coin.symbol[0]}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{coin.symbol}</span>
                    <span className="text-gray-800 text-sm">{coin.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white font-bold">{coin.price}</span>
                    <span className={`text-xs flex items-center gap-1 ${coin.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {coin.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4 flex-wrap justify-center">
          <button className="group px-8 py-4 bg-white text-black rounded-xl hover:from-purple-500 hover:border shadow-lg shadow-zinc-500/50 transition-all duration-300  hover:shadow-2xl hover:shadow-zinc-500/60 font-semibold flex items-center gap-2">
            <Eye className="w-5 h-5 group-hover:animate-pulse" />
            <Link href="/coins" className="hover:text-blue-300 transition">
            Explore Coins
            </Link>
          </button>

          <button className="px-8 py-4 bg-white text-black rounded-xl hover:from-purple-500 hover:border shadow-lg shadow-zinc-500/50 transition-all duration-300  hover:shadow-2xl hover:shadow-zinc-500/60 font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
           <Link href="/signup" className="hover:text-blue-300 transition">
            Get Started
           </Link>
          </button>
        </div>

        <div className="px-8 py-3 lg:ml-4 mt-4  bg-white text-black rounded-xl hover:from-purple-500 hover:border shadow-lg shadow-zinc-500/50 transition-all duration-300  hover:shadow-2xl hover:shadow-zinc-500/60 font-semibold flex items-center gap-2 hover:text-zinc-600">
          <a href="https://github.com/AdityaSetiaa/CryWatch.git"><Github/></a>
        </div>
        
        <div className="mt-16 flex gap-6 flex-wrap justify-center text-sm ">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border ">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Market Data
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border ">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Custom Watchlists
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border ">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            Price Alerts
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.3;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

    </div>
  );
}