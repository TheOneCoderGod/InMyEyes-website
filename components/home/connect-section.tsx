"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionContainer } from "@/components/common/section-container"
import { GradientHeading } from "@/components/common/gradient-heading"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  title: string
  username: string
  gradientFrom: string
  gradientTo: string
}

/**
 * Social media link component with consistent styling
 */
function SocialLink({ 
  href, 
  icon, 
  title, 
  username, 
  gradientFrom, 
  gradientTo 
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center group bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 hover:-translate-y-2 transition-all duration-300"
    >
      <div className={`bg-gradient-to-tr from-${gradientFrom} to-${gradientTo} p-5 rounded-full mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-white/60">{username}</p>
    </Link>
  )
}

/**
 * Connect section with social media links and client feature
 */
export function ConnectSection() {
  return (
    <SectionContainer background="default" padding="large">
      <MotionWrapper
        animation="fadeInUp"
        duration={0.8}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center"
      >
        <GradientHeading
          as="h2"
          gradient="secondary"
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          Connect With Me
        </GradientHeading>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
          {/* Instagram Link */}
          <SocialLink
            href="https://www.instagram.com/_.inmyeyes/"
            icon={
              <svg width="24" height="24" fill="currentColor" className="text-white">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153A4.904 4.904 0 0 1 2.525 15c-.247-.637-.415-1.363-.465-2.428C2.013 11.506 2 11.167 2 8.45c0-2.716.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.637-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.053-.059 1.37-.059 4.04 0 2.672.01 2.988.059 4.042.045.976.207 1.504.344 1.857.181.466.398.8.748 1.15.35.35.683.566 1.15.747.353.137.882.3 1.857.345 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.208 1.858-.345.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.352.3-.88.344-1.857.048-1.054.059-1.37.059-4.041 0-2.67-.01-2.987-.059-4.04-.045-.976-.207-1.505-.344-1.858-.181-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.054-.049-1.37-.059-4.041-.059z" />
                <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            }
            title="Instagram"
            username="@_.inmyeyes"
            gradientFrom="purple-600"
            gradientTo="amber-500"
          />
          
          {/* Linktree Link */}
          <SocialLink
            href="https://linktr.ee/_.inmyeyes"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M7.953 15.066c-.08.163-.08.324-.08.486.243.486.809.89 1.457.89.809 0 1.457-.404 1.457-.89 0-.162 0-.323-.081-.485-.242-.486-.809-.89-1.376-.89-.809 0-1.457.404-1.457.89zm10.804-3.718c-.324-.567-.89-.89-1.538-.89-.486 0-.97.162-1.376.486-.324.242-.728.647-1.214 1.133l-.81.89c-.404.486-.809.89-.97.971-.162.161-.324.161-.485.161-.162 0-.324 0-.486-.081-.647-.242-1.78-.728-1.78-2.753 0-.89.08-1.78.08-2.753 0-.404-.081-.728-.243-1.052-.161-.404-.566-.647-.97-.728-.08-.081-.242-.081-.404-.081-.485 0-.97.243-1.295.648-.324.404-.486.89-.486 1.457v.08c0 .97.082 1.942.082 2.913 0 .162 0 .324-.082.485-.081.162-.162.243-.324.324-.08 0-.161.08-.242.08-.162 0-.324-.08-.404-.161-.162-.162-.243-.323-.243-.566 0-1.052-.08-2.104-.08-3.156 0-.324-.082-.648-.244-.89-.242-.405-.647-.567-1.052-.567-.485 0-.97.243-1.214.648-.162.323-.242.647-.242.97 0 1.134.081 2.186.081 3.32 0 .242-.081.404-.243.566-.162.162-.405.242-.647.162-.243-.081-.405-.243-.486-.485-.08-.081-.08-.244-.08-.405 0-1.133 0-2.266.08-3.4.081-.404 0-.809-.161-1.133-.243-.405-.647-.648-1.134-.567-.485.08-.89.404-1.052.89-.081.241-.162.483-.081.809 0 1.133.08 2.266.08 3.4.082.808-.08 1.537-.565 2.103-.648.728-1.538.971-2.347.567-.728-.324-1.214-.97-1.376-1.78-.08-.323-.08-.646 0-.97.081-.161.081-.404.162-.565.081-.486.162-.89.162-1.376v-.162c-.081-.485-.324-.97-.728-1.295-.323-.243-.728-.323-1.133-.243-.404.081-.728.324-.97.648-.242.323-.323.728-.323 1.133.08.728.242 1.457.485 2.104.081.243.162.405.243.648.08.242.161.485.242.728.162.566.404 1.133.566 1.618.89 2.51 2.186 4.694 4.37 6.07 1.538.971 3.32 1.538 5.1 1.538.728 0 1.457-.081 2.186-.243 1.699-.324 3.157-1.214 4.127-2.672.89-1.376 1.213-3.076.971-4.694-.08-.729-.323-1.295-.647-1.862zm-11.37.485c0-.404.162-.809.486-1.133.08-.081.242-.162.323-.243.082 0 .244-.08.325-.08h.08c.243 0 .486.16.647.404.162.162.162.405.162.648 0 .809 0 1.618.081 2.427v.405c0 .08 0 .162-.081.242 0 .162-.081.243-.162.324-.162.162-.404.243-.647.243-.243 0-.405-.081-.567-.243-.162-.162-.242-.323-.242-.566-.081-.648-.081-1.376-.081-2.024-.081-.08-.081-.242-.081-.404h.081-.08.08zm8.697 5.26c-.809.809-1.78 1.375-2.914 1.78-1.133.404-2.347.485-3.561.485h-.243c-1.618-.081-3.237-.485-4.694-1.214-.162-.08-.324-.162-.486-.322-.08-.081-.162-.163-.162-.324 0-.243.162-.486.405-.567.162-.08.404-.08.566.081 1.376.728 2.834 1.214 4.37 1.376 1.538.162 3.076-.08 4.533-.647 1.376-.566 2.59-1.457 3.4-2.672.81-1.214 1.214-2.67 1.134-4.127 0-.647-.081-1.295-.243-1.942-.162-.647-.404-1.214-.809-1.78-.161-.243-.242-.486-.242-.728 0-.243.081-.486.243-.648.162-.162.324-.242.566-.242.081 0 .162 0 .243.08.242.082.404.243.566.486.323.566.647 1.132.809 1.78.242.728.403 1.538.403 2.347 0 .809-.08 1.618-.242 2.428-.323 1.457-1.053 2.833-2.186 3.884l.162.162-.162-.162z"></path>
              </svg>
            }
            title="Linktree"
            username="_.inmyeyes"
            gradientFrom="green-500"
            gradientTo="emerald-400"
          />
        </div>
        
        {/* Client Feature */}
        <div className="mt-16 pt-12 border-t border-zinc-800/50">
          <h3 className="text-2xl font-semibold mb-8">Featured Client</h3>
          <MotionWrapper
            animation="zoomIn"
            duration={0.5}
            viewport={{ once: true }}
            className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 max-w-lg mx-auto"
          >
            <p className="text-xl mb-8 text-white/90">Check out my client's YouTube channel for more great content!</p>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white/20 hover:bg-white/10 rounded-full group"
            >
              <a
                href="https://youtube.com/@pttysss?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <svg 
                  className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-400 transition-colors" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                @pttysss
              </a>
            </Button>
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </SectionContainer>
  )
}