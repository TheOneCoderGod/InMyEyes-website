"use client"

import React from "react"
import { ContactHero } from "@/components/contact/contact-hero"
import { SocialProfiles } from "@/components/contact/social-profiles"
import { SelectedWork } from "@/components/contact/selected-work"
import { PageContainer } from "@/components/layout/page-container"

export default function Contact() {
  return (
    <PageContainer showScrollToTop={true} scrollThreshold={800}>
      {/* Hero section with parallax effect */}
      <ContactHero />

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Social Media Profiles */}
          <SocialProfiles />
          
          {/* Selected Work with dynamically loaded images */}
          <SelectedWork />
        </div>
      </section>
    </PageContainer>
  )
}
