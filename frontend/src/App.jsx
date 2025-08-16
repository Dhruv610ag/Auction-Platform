import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import "./index.css"

export default function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900">
      
      {/* Animated neon background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-3xl top-[-100px] left-[-150px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/30 rounded-full blur-3xl bottom-[-100px] right-[-150px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-400/30 rounded-full blur-3xl bottom-[100px] left-[200px] animate-pulse" />
      </div>

      <Card className="w-[460px] shadow-[0_0_35px_rgba(255,0,150,0.6)] rounded-2xl bg-gray-900/80 border border-purple-500/50 backdrop-blur-xl">
        <CardContent className="p-8 flex flex-col items-center text-center gap-6">
          
          {/* Title */}
          <motion.h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400 drop-shadow-[0_0_12px_rgba(255,0,200,0.8)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ⚡ Bid Buddy ⚡
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-lg text-gray-300 font-medium italic drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your smart companion for thrilling auctions — <br/> 
            Bid. Win. Celebrate. 🌟
          </motion.p>

          {/* Navigation Buttons */}
          <nav className="flex flex-col gap-4 w-full mt-4">
            <Link to="/login" className="w-full">
              <Button 
                variant="default" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(255,0,150,0.6)]"
              >
                Login
              </Button>
            </Link>
            <Link to="/register" className="w-full">
              <Button 
                variant="outline" 
                className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20 shadow-[0_0_10px_rgba(138,43,226,0.6)]"
              >
                Register
              </Button>
            </Link>
            <Link to="/auctions" className="w-full">
              <Button 
                variant="secondary" 
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-black font-semibold shadow-[0_0_15px_rgba(0,255,255,0.6)]"
              >
                Auctions
              </Button>
            </Link>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
