import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import API from "../lib/api";
import { io } from "socket.io-client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function AuctionDetail() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [current, setCurrent] = useState(null);
  const [myBid, setMyBid] = useState("");
  const socket = useMemo(() => io(import.meta.env.VITE_API_BASE), []);

  async function load() {
    const res = await API.get(`/auctions/${id}`);
    setAuction(res.data.auction);
    setCurrent(res.data.current);
  }

  async function placeBid() {
    try {
      await API.post("/bids", { auction_id: id, amount: parseFloat(myBid) });
      setMyBid("");
    } catch (e) {
      alert(e.response?.data?.error || e.message);
    }
  }

  useEffect(() => {
    load();
    socket.emit("join_auction", id);
    socket.on("new_bid", ({ auction_id, amount }) => {
      if (auction_id === id) setCurrent(amount);
    });
    return () => {
      socket.emit("leave_auction", id);
      socket.off("new_bid");
      socket.disconnect();
    };
  }, [id]);

  if (!auction)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-gray-400">Loading auction details...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6 relative overflow-hidden">
      {/* Animated cosmic glows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15),_transparent_70%)] animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,255,255,0.15),_transparent_70%)] animate-pulse"
      />

      {/* Auction Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="rounded-3xl shadow-2xl border border-indigo-500 bg-gray-900/70 backdrop-blur-2xl hover:shadow-indigo-500/50 transition">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-indigo-400 drop-shadow-lg">
              {auction.title}
            </CardTitle>
            <p className="text-gray-300 text-sm mt-1">{auction.description}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Auction Status */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-300">Status:</span>
              <Badge
                variant={
                  auction.status === "live"
                    ? "default"
                    : auction.status === "upcoming"
                    ? "secondary"
                    : "destructive"
                }
                className="capitalize px-3 py-1 text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
              >
                {auction.status}
              </Badge>
            </div>

            {/* Current Bid */}
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-gray-300">Current Bid:</span>
              <span className="font-bold text-indigo-400 text-2xl drop-shadow-lg">
                ₹{current || auction.start_price}
              </span>
            </div>

            {/* Place a Bid */}
            <div>
              <label className="text-sm font-medium text-gray-300">Your Bid</label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={myBid}
                  onChange={(e) => setMyBid(e.target.value)}
                  className="bg-gray-800/70 border-indigo-600 text-white placeholder-gray-400 focus:ring-indigo-500"
                />
                <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,0,255,0.6)" }}>
                  <Button
                    onClick={placeBid}
                    disabled={!myBid}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg rounded-xl"
                  >
                    Place Bid
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-400">
            Auction ends:{" "}
            <span className="font-medium text-gray-300">
              {new Date(auction.end_time).toLocaleString()}
            </span>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}