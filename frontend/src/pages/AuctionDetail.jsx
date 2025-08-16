import { useEffect, useState } from "react"
import API from "../lib/api"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Auctions() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_price: 10,
    bid_increment: 1,
    start_time: "",
    end_time: "",
  })

  async function load() {
    const res = await API.get("/auctions")
    setList(res.data)
  }

  async function create() {
    const s = await API.post("/auctions", form)
    if (s.data?.id) {
      setForm({
        title: "",
        description: "",
        start_price: 10,
        bid_increment: 1,
        start_time: "",
        end_time: "",
      })
      load()
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-12 overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      {/* Neon background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-3xl top-[-100px] left-[-150px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/30 rounded-full blur-3xl bottom-[-100px] right-[-150px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-400/30 rounded-full blur-3xl bottom-[100px] left-[200px] animate-pulse" />
      </div>

      {/* Page Title */}
      <motion.h2
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400 mb-8 drop-shadow-[0_0_15px_rgba(255,0,200,0.8)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ⚡ Auctions
      </motion.h2>

      {/* Create Auction Form */}
      <Card className="w-[500px] mb-10 shadow-[0_0_25px_rgba(255,0,150,0.5)] rounded-2xl bg-gray-900/80 border border-purple-500/50 backdrop-blur-xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">🛠️ Create Auction (Seller)</h3>

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500"
          />

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500"
          />

          <Input
            type="number"
            placeholder="Start Price"
            value={form.start_price}
            onChange={(e) => setForm({ ...form, start_price: e.target.value })}
            className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500"
          />

          <Input
            type="number"
            placeholder="Bid Increment"
            value={form.bid_increment}
            onChange={(e) => setForm({ ...form, bid_increment: e.target.value })}
            className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500"
          />

          <Input
            type="datetime-local"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            className="bg-gray-800 border-purple-500/40 text-white focus-visible:ring-purple-500"
          />

          <Input
            type="datetime-local"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            className="bg-gray-800 border-purple-500/40 text-white focus-visible:ring-purple-500"
          />

          <Button
            onClick={create}
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(255,0,150,0.6)]"
          >
            Create Auction
          </Button>
        </CardContent>
      </Card>

      {/* Auction List */}
      <Card className="w-[600px] shadow-[0_0_25px_rgba(0,255,255,0.4)] rounded-2xl bg-gray-900/80 border border-cyan-400/50 backdrop-blur-xl">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold text-cyan-300 mb-4">📜 Available Auctions</h3>
          <ul className="space-y-3">
            {list.length === 0 ? (
              <p className="text-gray-400">No auctions available yet.</p>
            ) : (
              list.map((a) => (
                <li
                  key={a.id}
                  className="p-3 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-purple-500 transition-colors"
                >
                  <Link
                    to={`/auctions/${a.id}`}
                    className="text-lg font-semibold text-purple-400 hover:text-pink-400 drop-shadow-[0_0_8px_rgba(255,0,200,0.6)]"
                  >
                    {a.title}
                  </Link>
                  <span className="ml-3 text-sm text-gray-400">— {a.status}</span>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
