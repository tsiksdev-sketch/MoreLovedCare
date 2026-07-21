import { Advice } from '@/components/home/advice'
import { Careers } from '@/components/home/careers'
import { FinalCTA } from '@/components/home/finalcta'
import { FromUsToYou } from '@/components/home/fromeustoyou'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/howitworks'
import { Pathways } from '@/components/home/pathways'
import { Quality } from '@/components/home/quality'
import { Services } from '@/components/home/services'
import { Testimonials } from '@/components/home/testimonials'
import { TrustBar } from '@/components/home/trustbar'
import React from 'react'


function page() {
  return (
    <main > 
        <Hero />
        <TrustBar />
        <FromUsToYou />
        <Services />
        <HowItWorks />
        <Pathways />
        <Quality />
        <Testimonials />
        <Advice />
        <Careers />
        <FinalCTA />
    </main>
  
  )
}

export default page