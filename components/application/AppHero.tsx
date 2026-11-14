import React from 'react'
import HeroParallax from '../content/hero-parallax'

import careers from "@/public/careers.jpg";

function AppHero() {
  return (
    <main>
        <HeroParallax image={careers}>
            <div className='absolute top-20'>
                    <p className="eyebrow text-gold">Careers</p>

          <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
            Appliction Process
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-primary-foreground/85 leading-relaxed">
            Here is an opportunity for you to join our team at Moreloved Care
          </p>
            </div>
             
        </HeroParallax>
    </main>
  )
}

export default AppHero