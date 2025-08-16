import { useEffect, useState } from "react";
import API from "../lib/api";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function Auctions() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_price: 10,
    bid_increment: 1,
    start_time: "",
    end_time: "",
  });

  async function load() {
    const res = await API.get("/auctions");
    setList(res.data);
  }

  async function create() {
    const s = await API.post("/auctions", form);
    if (s.data?.id) {
      setForm({
        title: "",
        description: "",
        start_price: 10,
        bid_increment: 1,
        start_time: "",
        end_time: "",
      });
      load();
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-8 relative overflow-hidden">
      {/* Glowing star particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15),_transparent_70%)] animate-pulse"
      />

      <div className="grid gap-8 md:grid-cols-2 relative z-10">
        {/* Create Auction Form */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-2xl border border-indigo-600 bg-gray-900/70 backdrop-blur-2xl rounded-3xl hover:shadow-indigo-500/50 transition">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-indigo-400 drop-shadow-lg">Create Auction (Sellers)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["title","description","start_price","bid_increment","start_time","end_time"].map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Label className="text-indigo-200 capitalize">{field.replace("_", " ")}</Label>
                  <Input
                    type={field.includes("price") || field.includes("increment") ? "number" : field.includes("time") ? "datetime-local" : "text"}
                    placeholder={field.replace("_", " ")}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="mt-1 bg-gray-900/60 border-indigo-600 text-white placeholder-gray-400 focus:ring-indigo-500"
                  />
                </motion.div>
              ))}
            </CardContent>
            <CardFooter>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,0,255,0.6)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={create}
                  className="w-full py-3 text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg rounded-xl"
                >
                  Create Auction
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Auction List */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="shadow-2xl border border-purple-600 bg-gray-900/70 backdrop-blur-2xl rounded-3xl hover:shadow-purple-500/50 transition">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-400 drop-shadow-lg">Live Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              {list.length === 0 ? (
                <p className="text-gray-400">No auctions available yet.</p>
              ) : (
                <ul className="space-y-3">
                  {list.map((a, i) => (
                    <motion.li
                      key={a.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center justify-between rounded-lg border border-gray-700 p-3 shadow-sm hover:bg-gray-700/30 hover:shadow-indigo-500/40 transition cursor-pointer"
                    >
                      <div>
                        <Link
                          to={`/auctions/${a.id}`}
                          className="text-lg font-medium text-indigo-400 hover:text-pink-400 hover:underline transition"
                        >
                          {a.title}
                        </Link>
                        <p className="text-sm text-gray-400">{a.status}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-300">₹{a.start_price}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}