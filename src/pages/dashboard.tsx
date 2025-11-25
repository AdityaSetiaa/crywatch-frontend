import { useEffect, useState } from "react";
import { Plus, Trash2, TrendingUp, Wallet, Star, Search, Filter } from "lucide-react";
import Background from "@/Component/Background";
import { useRouter } from "next/router";
import { fetchWatchlist, addCoin, deleteCoin } from "@/lib/api";


interface WatchlistItem {
  id: number;
  coin_name: string;
  symbol: string;
  notes?: string;
  price?: number;
  change?: number;
}


export default function Dashboard() {
  const router = useRouter();
  const [coins, setCoins] = useState<WatchlistItem[]>([]);
  const [coinName, setCoinName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      

  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/login");
    return;
  }

  load();
}, [router.isReady]);



  async function load() {
  try {
    const res = await fetchWatchlist();
    setCoins(res.data || []); 
  } catch (err: any) {
    console.error("Watchlist error:", err);
    if (err.response?.status === 404) {
      setCoins([]); 
    }
  }
}

  async function handleAdd() {
    if (!coinName || !symbol) return;
    setLoading(true);
    await addCoin({ coin_name: coinName, symbol: symbol.toUpperCase(), notes: "", price: 0, change: 0 });
    setCoinName("");
    setSymbol("");
    setLoading(false);
    load();
  }

  async function handleDelete(id: number) {
    await deleteCoin(id);
    load();
  }

  const filteredCoins = coins.filter(coin => 
    coin.coin_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = coins.reduce((acc, coin) => acc + (coin.price || 0), 0);

  return (
    <div className="min-h-screen mt-13 z-3 relative">
     

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Watchlist</h1>
          <p className="text-gray-950">Track your favorite cryptocurrencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
          <div className="bg-white/5 backdrop-blur-xl border border-black/60 rounded-2xl p-6 hover:shadow-lg transition-all flex sm:justify-between lg:justify-">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              <span className="text-gray-950 text-sm">Total Tracked</span>
            </div>
            <div className="text-3xl font-bold text-white">{coins.length}</div>
            <div className="text-sm text-gray-950 mt-1">Crypto</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-black/60 rounded-2xl p-6 hover:shadow-lg flex sm:justify-between lg:justify- transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-950 text-sm">Portfolio Value</span>
            </div>
            <div className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</div>
            <div className="text-sm text-green-400 mt-1">+12.5% today</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-black/60 rounded-2xl p-6  hover:shadow-lg flex sm:justify-between lg:justify- transition-all">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-950 text-sm">Best Performer</span>
            </div>
            <div className="text-3xl font-bold text-white">BTC</div>
            <div className="text-sm text-green-400 mt-1">+5.2% today</div>
          </div>
        </div>

        <div className="bg-white/5 hover:shadow-lg duration-300 backdrop-blur-xl border rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Coin</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative border rounded-xl">
              <input
                placeholder="Coin Name (e.g., Bitcoin)"
                className="w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
              />
            </div>
            <div className="flex-1 relative border rounded-xl">
              <input
                placeholder="Symbol (e.g., BTC)"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all uppercase"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAdd}
              disabled={loading || !coinName || !symbol}
              className="px-6 py-3 bg-linear-to-r from-white to-zinc-100  text-black rounded-xl border font-semibold shadow-lg shadow-zinc-500/50 hover:shadow-zinc-500/70 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Coin
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 mb-6  ">
          <div className="flex-1 relative hover:shadow-lg duration-300 ">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              placeholder="Search your watchlist..."
              className="w-full pl-12  py-3 bg-white/5 border-b border-black  text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500  transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-black hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border-2 border-black rounded-2xl overflow-hidden hover:shadow-lg duration-300 ">
          <div className="overflow-x-auto pt-5">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black border-r ">Coin</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black border-r ">Symbol</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black border-r ">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black border-r ">24h Change</th>
                  <th className="px-6 py-4  text-sm font-semibold text-black text-center ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No coins in your watchlist yet. Add one above!
                    </td>
                  </tr>
                ) : (
                  filteredCoins.map((coin) => (
                    <tr key={coin.id} className="border-b borderhover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white text-zinc-800 rounded-full flex text-2xl items-center justify-center font-bold">
                            {coin.coin_name[0]}
                          </div>
                          <span className="text-white font-medium">{coin.coin_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-black border  font-mono text-sm bg-white/5 px-3 py-1 rounded-lg">
                          {coin.symbol}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-zinc-800 font-semibold">
                          ${coin.price?.toLocaleString() || ''}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {coin.change !== undefined && (
                          <span className={`flex items-center gap-1 ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            <TrendingUp className={`w-4 h-4 ${coin.change < 0 ? 'rotate-180' : ''}`} />
                            {coin.change > 0 ? '+' : ''}{coin.change}%
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-ceneter">
                        <button
                          onClick={() => handleDelete(coin.id)}
                          className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-2 ml-auto opacity-90 group-hover:opacity-100 text-center"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Background/>
    </div>
  );
}