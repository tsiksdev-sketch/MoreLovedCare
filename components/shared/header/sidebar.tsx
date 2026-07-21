'use client'


import * as React from 'react'
import Link from 'next/link'
import { LayoutGrid } from 'lucide-react'
import data from '@/lib/data'



import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'


type Gang = {
  label: string;
  to: string; // add this
  items: { to: string; label: string; desc: string }[];
};

type Group = {
  label: string;
  to: string; // add this
  items: { to: string; label: string; desc: string }[];
};




const groups: Group[] = [
 
 {
  label: "Tools",
  to: "/tools",
  items: [
    { to: "/tools/carbon", label: "Carbon Calculator", desc: "Estimate carbon footprint quickly." },
    { to: "/tools/glossary", label: "Carbon Market Glossary", desc: "Learn key carbon market terms." },
    { to: "/tools/diagnostic", label: "Diagnostic Request", desc: "Request a tools-based assessment." },
    { to: "/tools/diagnostic", label: "REC Readiness Checklist", desc: "Check readiness for RECs and claims." },
    { to: "/tools/diagnostic", label: "ESG and GHG Data Checklist", desc: "Confirm data needs for reporting." },
    { to: "/tools/diagnostic", label: "MRV Readiness Checklist", desc: "Assess MRV and safeguards readiness." },
  ],
}
  
];

const gangs: Gang[] = [
  {
    label: "Services",
    to: "/services",
    items: [
      {
  to: "/services/carbonmarketsprojects",
  label: "Carbon Markets & Project Development",
  desc: "Develop high-integrity carbon market projects."
},
{
  to: "/services/article6advisory",
  label: "Article 6, Policy & Regulatory Advisory",
  desc: "Navigate Article 6 policy and compliance."
},
{
  to: "/services/recs",
  label: "Renewable Energy Certificates & Energy Attribute Markets",
  desc: "Manage RECs and energy attribute claims."
},
{
  to: "/services/esgfootprint",
  label: "ESG, GHG & Carbon Footprinting",
  desc: "Measure and report GHG and footprints."
},
{
  to: "/services/mrvsafeguard",
  label: "MRV, Safeguards & Stakeholder Engagement",
  desc: "Strengthen MRV, safeguards, and engagement."
},
{
  to: "/services/climatefinance",
  label: "Climate Finance & Investor Readiness",
  desc: "Improve readiness for climate finance."
},
{
  to: "/services/capacitybuildingtraining",
  label: "Capacity Building & Training",
  desc: "Build skills with practical training."
}
    ],
  },
];
 

export default function SideNav (){
 
  return (
    <Drawer  direction='right' >
      <DrawerTrigger className='header-button flex items-center p-2!   '>
        <LayoutGrid className='h-5 w-5 mr-1 text-lime-500' />
      
      </DrawerTrigger>
      <DrawerHeader>
              <DrawerTitle className='flex items-center'>
                
               
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
      <DrawerContent className='border-none w-87.5 mt-0 top-0 bg-linear-to-bl from-lime-500 via-emerald-500  to-green-500 text-white z-100'>
        <div className='flex flex-col h-full'>
         
          <div className=' text-foreground flex items-center justify-between  '>
           
         
          </div>

        
          <div className='flex-1 flex flex-col text-white pt-10  overflow-y-auto'>
             <Link href="/" className="rounded-md pl-12 text-[16px] ">
           Home
          </Link>
           <Link href="/about" className="rounded-md pl-12 pt-2 text-[16px]">
           About
          </Link>
         {gangs.map((d) => (
  <div key={d.label} className="pt-2 pl-12 text-white">
    <Link
      href={d.to}
      className="mb-1 block text-xs font-semibold uppercase tracking-wider hover:underline"
    >
      {d.label}
    </Link>

    {d.items.map((at, v) => (
      <Link
        key={v}
        href={at.to}
        className="block py-2 text-sm hover:underline"
      >
        <p className="font-medium">{at.label}</p>
        <p className="text-xs opacity-80">{at.desc}</p>
      </Link>
    ))}
  </div>
))}
            <nav className='flex flex-col pl-10 text-[16px] text-white'>
              {data.menu.map((l,id) => (
                <DrawerClose asChild key={id}>
                  <Link
                    href={l.href}
                    className={`flex items-center justify-between item-button`}
                  >
                    <h2 className='p-2'>{l.name}</h2>
                   
                  </Link>
                </DrawerClose>
              ))}
            </nav>
       {groups.map((d) => (
  <div key={d.label} className="pt-2 pl-12 text-white">
    <Link
      href={d.to}
      className="mb-1 block text-xs font-semibold uppercase tracking-wider hover:underline"
    >
      {d.label}
    </Link>

    {d.items.map((at, v) => (
      <Link
        key={v}
        href={at.to}
        className="block py-2 text-sm hover:underline"
      >
        <p className="font-medium">{at.label}</p>
        <p className="text-xs opacity-80">{at.desc}</p>
      </Link>
    ))}
  </div>
))}
                <Link href="/contact" className="rounded-md pl-12 text-[16px] ">
           Contact
          </Link>
          </div>

        
        
        </div>
      </DrawerContent>
    </Drawer>
  )
}