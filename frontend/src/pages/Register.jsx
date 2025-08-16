import { useState } from "react"
import { supabase } from "../lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("buyer")

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return alert(error.message)

    const userId = data.user?.id
    if (userId) {
      const { error: up } = await supabase
        .from("users")
        .upsert({ id: userId, name, role })
      if (up) return alert(up.message)
    }
    alert("Signup success. Check email to confirm if required.")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900">
      
      {/* Neon background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-3xl top-[-100px] left-[-150px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/30 rounded-full blur-3xl bottom-[-100px] right-[-150px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-400/30 rounded-full blur-3xl bottom-[100px] left-[200px] animate-pulse" />
      </div>

      <Card className="w-[420px] shadow-[0_0_30px_rgba(255,0,150,0.5)] rounded-2xl bg-gray-900/80 border border-purple-500/50 backdrop-blur-xl">
        <CardContent className="p-6 flex flex-col items-center gap-6">
          
          <motion.h2
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(255,0,200,0.8)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            📝 Register
          </motion.h2>

          <div className="w-full flex flex-col gap-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500 shadow-[0_0_10px_rgba(138,43,226,0.4)]"
            />

            <Select value={role} onValueChange={(val) => setRole(val)}>
              <SelectTrigger className="bg-gray-800 border-purple-500/40 text-purple-300 focus:ring-purple-500 shadow-[0_0_10px_rgba(138,43,226,0.4)]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border border-purple-500/40">
                <SelectItem value="buyer">👤 Buyer</SelectItem>
                <SelectItem value="seller">💼 Seller</SelectItem>
                <SelectItem value="admin">⚡ Admin</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500 shadow-[0_0_10px_rgba(138,43,226,0.4)]"
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-purple-500/40 text-white placeholder-gray-400 focus-visible:ring-purple-500 shadow-[0_0_10px_rgba(138,43,226,0.4)]"
            />

            <Button
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-semibold shadow-[0_0_15px_rgba(255,0,150,0.6)]"
            >
              Sign Up
            </Button>

            {/* Already have account */}
            <p className="text-center text-gray-300 text-sm mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-pink-400 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
