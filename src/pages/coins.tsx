import { useEffect, useState } from "react";
import axios from "axios";
import { addCoin } from "@/lib/api";
import { useRouter } from "next/router";
import { Plus, TrendingUp, TrendingDown, Search, Check, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h?: number;
  market_cap?: number;
  total_volume?: number;
  market_cap_rank?: number;
}

export default function Coins() {
  const router = useRouter();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addedCoins, setAddedCoins] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);
  const [hoveredCoin, setHoveredCoin] = useState<string | null>(null);

  useEffect(() => {
    loadCoins();
  }, []);

  async function loadCoins() {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 20,
        },
      }
    );
    setCoins(res.data);
  }

  async function handleAdd(coin: Coin) {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(coin.id);
    try {
      await addCoin({
  coin_name: coin.name,
  symbol: coin.symbol.toUpperCase(),
  notes: "",
  price: coin.current_price,
  change: coin.price_change_percentage_24h,
});

      setAddedCoins(prev => new Set(prev).add(coin.id));
    } catch (error) {
      alert("Failed to add coin");
    } finally {
      setLoading(null);
    }
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topGainer = coins.length > 0 ? coins.reduce((max, coin) => 
    (coin.price_change_percentage_24h || 0) > (max.price_change_percentage_24h || 0) ? coin : max
  ) : null;

  const topLoser = coins.length > 0 ? coins.reduce((min, coin) => 
    (coin.price_change_percentage_24h || 0) < (min.price_change_percentage_24h || 0) ? coin : min
  ) : null;

  const totalMarketCap = coins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);

  return (
    <div className="min-h-screen 0 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-linear(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[100px_100px]"></div>
      
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="mb-8 text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-3 bg-clip-text bg-linear-to-r from-white via-zinc-600 to-white">
            Cryptocurrency Prices
          </h1>
          <p className="text-gray-700 text-lg">Track the top 20 cryptocurrencies by market cap</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white backdrop-blur-2xl border  rounded-3xl p-6  hover:border-blue-500 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 text-sm">Total Market Cap</span>
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ${(totalMarketCap / 1e12).toFixed(2)}T
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>Top {coins.length} coins</span>
              </div>
            </div>
          </div>

          {topGainer && topGainer.price_change_percentage_24h && (
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative  backdrop-blur-2xl border bg-white rounded-3xl p-6 hover:border-green-500 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-900 text-sm">Top Gainer (24h)</span>
                  <img src={topGainer.image} alt={topGainer.name} className="w-10 h-10 rounded-full" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{topGainer.name}</div>
                <div className="flex items-center gap-2 text-green-400 text-lg font-semibold">
                  <ArrowUpRight className="w-5 h-5" />
                  <span>+{topGainer.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          )}

          {topLoser && topLoser.price_change_percentage_24h && topLoser.price_change_percentage_24h < 0 && (
            <div className="relative group">
             <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white backdrop-blur-2xl border  rounded-3xl p-6 hover:border-red-400 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-900 text-sm">Top Loser (24h)</span>
                  <img src={topLoser.image} alt={topLoser.name} className="w-10 h-10 rounded-full" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{topLoser.name}</div>
                <div className="flex items-center gap-2 text-red-400 text-lg font-semibold">
                  <ArrowDownRight className="w-5 h-5" />
                  <span>{topLoser.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 relative group border-b">
          <div className="absolute inset-0 blur-lg opacity-0 border group-hover:opacity-20 transition-opacity"></div>
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
          <input
            placeholder="Search coins by name or symbol..."
            className="relative w-full pl-14 pr-6 py-4  border border-white/10  text-black placeholder-gray-500 focus:outline-none focus:border-b-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 rounded">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onMouseEnter={() => setHoveredCoin(coin.id)}
              onMouseLeave={() => setHoveredCoin(null)}
              className="relative group"
            >
              <div className={`absolute inset-0  rounded-3xl blur-xl transition-opacity ${
                (coin.price_change_percentage_24h || 0) >= 0
                  ? 'from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20'
                  : 'from-red-500 to-orange-500 opacity-0 group-hover:opacity-20'
              }`}></div>
              
              <div className="relative bg-white/5 backdrop-blur-2xl border-b p-6 hover:bg-white/8 hover:border-b-cyan-800 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* Coin Info */}
                  <div className="flex items-center gap-5 flex-1 min-w-[250px]">
                    {coin.market_cap_rank && (
                      <div className="text-gray-500 font-bold text-lg min-w-10">
                        #{coin.market_cap_rank}
                      </div>
                    )}
                    
                    <div className="relative">
                      <div className={`absolute inset-0 border rounded-2xl blur-md transition-opacity ${
                        hoveredCoin === coin.id ? 'opacity-50' : 'opacity-0'
                      } ${(coin.price_change_percentage_24h || 0) >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <img 
                        src={coin.image} 
                        alt={coin.name} 
                        className={`relative w-16 h-16 rounded-2xl shadow-2xl transition-transform ${
                          hoveredCoin === coin.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-black text-xl font-bold">{coin.name}</span>
                        <span className="text-gray-400 text-sm uppercase font-mono bg-white/5 px-3 py-1 rounded-lg">
                          {coin.symbol}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm flex-wrap">
                        {coin.market_cap && (
                          <span className="text-gray-700">
                            MCap: <span className="text-gray-900 font-semibold">${(coin.market_cap / 1e9).toFixed(2)}B</span>
                          </span>
                        )}
                        {coin.total_volume && (
                          <span className="text-gray-700">
                            Vol: <span className="text-gray-900 font-semibold">${(coin.total_volume / 1e9).toFixed(2)}B</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">
                        ${coin.current_price.toLocaleString()}
                      </div>
                      {coin.price_change_percentage_24h !== undefined && (
                        <div className={`flex items-center justify-end gap-2 px-3 py-1.5 rounded-xl font-semibold ${
                          coin.price_change_percentage_24h >= 0
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>
                            {coin.price_change_percentage_24h > 0 ? '+' : ''}
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      {addedCoins.has(coin.id) ? (
                        <button className="px-6 py-3 bg-green-500/20 border-2 border-green-500/40 text-green-400 rounded-2xl font-semibold flex items-center gap-2 cursor-default shadow-lg shadow-green-500/20">
                          <Check className="w-5 h-5" />
                          <span className="hidden sm:inline">Added</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAdd(coin)}
                          disabled={loading === coin.id}
                          className="px-6 py-3 bg-white  text-black rounded-2xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading === coin.id ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span className="hidden sm:inline">Adding...</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-5 h-5" />
                              <span className="hidden sm:inline">Add to Watchlist</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-gray-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live prices • Data provided by CoinGecko API</span>
          </div>
        </div>
      </div>
    </div>
  );
}