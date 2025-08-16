import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)
    nav("/auctions")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900">
      
      {/* Neon background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-3xl top-[-100px] left-[-150px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/30 rounded-full blur-3xl bottom-[-100px] right-[-150px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-400/30 rounded-full blur-3xl bottom-[100px] left-[200px] animate-pulse" />
      </div>

      <Card className="w-[400px] shadow-[0_0_30px_rgba(255,0,150,0.5)] rounded-2xl bg-gray-900/80 border border-purple-500/50 backdrop-blur-xl">
        <CardContent className="p-6 flex flex-col items-center gap-6">
          
          <motion.h2
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(255,0,200,0.8)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🔑 Login
          </motion.h2>

          <div className="w-full flex flex-col gap-4">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500 shadow-[0_0_10px_rgba(138,43,226,0.4)]"
            />

            {/* Password with eye toggle */}
            <div className="relative">
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500 shadow-[0_0_10px_rgba(138,43,226,0.4)] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-semibold shadow-[0_0_15px_rgba(255,0,150,0.6)]"
            >
              Login
            </Button>

            {/* Register link */}
            <p className="text-sm text-gray-400 text-center">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-purple-400 hover:text-pink-400 font-medium underline"
              >
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
