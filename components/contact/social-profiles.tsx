"use client"

import { motion } from "framer-motion"

interface SocialProfileProps {
  href: string
  icon: React.ReactNode
  title: string
  username: string
  ctaText: string
  gradientFrom: string
  gradientTo: string
  hoverGradient: string
}

function SocialProfileCard({
  href,
  icon,
  title,
  username,
  ctaText,
  gradientFrom,
  gradientTo,
  hoverGradient
}: SocialProfileProps) {
  return (
    <motion.a
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center group bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 shadow-lg relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className={`bg-gradient-to-tr from-${gradientFrom} to-${gradientTo} p-5 rounded-full mb-5 z-10`}>
        {icon}
      </div>
      <h3 className="text-2xl font-medium mb-2 z-10">{title}</h3>
      <p className="text-white/60 z-10 mb-4">{username}</p>
      <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/10 text-white/70 z-10 group-hover:bg-white/20 transition-colors">
        {ctaText}
      </span>
    </motion.a>
  )
}

export function SocialProfiles() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-24"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Social Profiles</h2>
      <p className="text-xl text-white/80 max-w-2xl mx-auto mb-16">Connect with me on social media platforms</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {/* Instagram Link */}
        <SocialProfileCard
          href="https://www.instagram.com/_.inmyeyes/"
          icon={
            <svg width="30" height="30" fill="currentColor" className="text-white">
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.218-1.79.465-2.428.247-.67.636-1.276 1.153-1.772a4.88 4.88 0 0 1 1.772-1.153c.637-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>
          }
          title="Instagram"
          username="@_.inmyeyes"
          ctaText="View Profile"
          gradientFrom="purple-600"
          gradientTo="amber-500"
          hoverGradient="from-purple-900/30 to-transparent"
        />
        
        {/* Linktree Link */}
        <SocialProfileCard
          href="https://linktr.ee/_.inmyeyes"
          icon={
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M7.953 15.066c-.08.163-.08.324-.08.486.243.486.809.89 1.457.89.809 0 1.457-.404 1.457-.89 0-.162 0-.323-.081-.485-.242-.486-.809-.89-1.376-.89-.809 0-1.457.404-1.457.89zm10.804-3.718c-.324-.567-.89-.89-1.538-.89-.486 0-.97.162-1.376.486-.324.242-.728.647-1.214 1.133l-.81.89c-.404.486-.809.89-.97.971-.162.161-.324.161-.485.161-.162 0-.324 0-.486-.081-.647-.242-1.78-.728-1.78-2.753v-7.24c0-.647-.486-1.133-1.053-1.133-.566 0-1.052.486-1.052 1.133v7.32c0 3.237 1.942 4.371 3.642 4.857.243.08.485.08.728.08.728 0 1.376-.242 1.862-.647.323-.242.728-.647 1.052-1.133l.89-.97c.323-.404.728-.89.97-.97.162-.162.324-.162.486-.162.161 0 .323 0 .485.08.647.243 1.7.728 1.7 2.672v.162c0 .647.485 1.133 1.052 1.133.566 0 1.052-.486 1.052-1.133v-.162c0-3.156-1.861-4.29-3.48-4.776zM13.035 7.742c-.728.728-.728 1.942.08 2.67.243.243.567.324.89.324.404 0 .729-.162.971-.405.728-.647.728-1.78-.08-2.589-.729-.728-1.862-.728-2.59-.081z" />
            </svg>
          }
          title="Linktree"
          username="_.inmyeyes"
          ctaText="View Links"
          gradientFrom="green-500"
          gradientTo="emerald-400"
          hoverGradient="from-green-900/30 to-transparent"
        />
      </div>
    </motion.div>
  )
}