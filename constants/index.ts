import { ShieldCheck, FileSearch, Scale, Eye, GitBranch, BadgeCheck } from "lucide-react";
import { Heart, Sparkles, Award, ChevronRight } from "lucide-react";
import { Leaf, BarChart3, Globe, BookOpen } from "lucide-react";
import { CalendarCheck, Users, Target,   } from "lucide-react";



export const audiences = {
  AudiencePathway: {
    title: "Choose your pathway",
    body: "For Governments & Regulators — build carbon market systems, Article 6 readiness and implementation frameworks. For Renewable Energy Producers — assess carbon and REC pathways, documentation, metering evidence and market readiness. For Banks & Corporates — measure emissions, strengthen ESG, prepare sustainability reports and develop reduction roadmaps. For Project Owners — screen opportunities, prepare feasibility evidence and structure project documentation. For Investors & Development Partners — assess climate projects, carbon/REC value and investment readiness. For Learners & Professionals — build practical capability through AICTS Academy. ",
  },
 AfricaRECsFeature : {
    title: "Africa RECs feature ",
    body: "Co-plan with our specialists, share resources, and align classroom strategies with each learner's sensory and communication profile.",
  },
  AICTSAcademyFeature : {
    title: " AICTS Academy",
    body: "AICTS Academy provides practical learning for professionals, institutions, regulators, project developers, companies and community organisations seeking to understand and participate responsibly in carbon markets, RECs, ESG, MRV and climate finance systems.",
  },
  IntegrityCallout : {
    title: "Integrity Callout",
    body: "AICTS promotes credible, evidence-based and responsible climate-market participation. We do not guarantee credit issuance, finance, offtake or carbon revenue. Our role is to help clients improve readiness, documentation, credibility and implementation pathways.",
  },
} as const;

export const SECTORS = [
  'Technology',
  'Healthcare',
  'Finance & Banking',
  'Education',
  'Manufacturing',
  'Retail & E-commerce',
  'Media & Entertainment',
  'Government & Public Sector',
  'Non-profit',
  'Real Estate',
  'Transportation & Logistics',
  'Energy & Utilities',
  'Hospitality & Tourism',
  'Legal Services',
  'Other',
];

export const COUNTRIES_REGIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Spain',
  'Italy',
  'Sweden',
  'Norway',
  'Denmark',
  'Switzerland',
  'Japan',
  'South Korea',
  'China',
  'India',
  'Singapore',
  'Brazil',
  'Mexico',
  'South Africa',
  'Nigeria',
  'Zimbabwe',
  'Zambia',
  'Kenya',
  'Egypt',
  'Ethiopia',
  'Ghana',
  'Morocco',
  'Tunisia',
  'Algeria',
  'Mozambique',
  'Botswana',
  'Uganda',
  'United Arab Emirates',
  'Europe (Other)',
  'Asia Pacific (Other)',
  'Latin America (Other)',
  'Middle East & Africa (Other)',
  'Other',
];

export const HOW_DID_YOU_HEAR = [
  'Google Search',
  'Social Media',
  'LinkedIn',
  'Referral from a friend or colleague',
  'Industry event or conference',
  'Blog or article',
  'Podcast',
  'Advertisement',
  'Email newsletter',
  'Other',
];

export const myths = [
  {
    myth: "Carbon offsets let companies pollute as usual.",
    truth:
      "High-integrity offsets sit on top of, not in place of, deep internal reductions. Frameworks like SBTi cap how much of a target can be met with credits and require absolute cuts first.",
  },
  {
    myth: "Planting trees is the cheapest path to net zero.",
    truth:
      "Forests matter, but permanence risk (fire, pests) and slow uptake make them a complement — not a substitute — for cutting fossil emissions. Durable removals are needed alongside.",
  },
  {
    myth: "Scope 3 is too messy to measure, so skip it.",
    truth:
      "Scope 3 typically dominates corporate footprints. Spend-based estimates get you started; supplier-specific data refines them over time. Imperfect data is better than ignored emissions.",
  },
  {
    myth: "Renewables can't run a 24/7 grid.",
    truth:
      "Hourly-matched clean energy, storage, demand response, and transmission upgrades already deliver firm low-carbon power in multiple markets. The bottleneck is policy and grid build, not physics.",
  },
  {
    myth: "Individual action doesn't matter.",
    truth:
      "Individual choices shift demand, social norms, and politics — which then unlock the systems-level changes. Both layers are required; they're not in competition.",
  },
  {
    myth: "Carbon markets are unregulated chaos.",
    truth:
      "Compliance markets (EU ETS, California, UK ETS) are tightly regulated. Voluntary markets are now governed by ICVCM Core Carbon Principles and VCMI Claims Code — quality standards that didn't exist five years ago.",
  },
];

export const steps = [
  { icon: Target, title: "Week 1 — Baseline", body: "Audit your current footprint, map material categories, set boundary." },
  { icon: Sparkles, title: "Week 2 — Levers", body: "Workshops on energy, supply chain, travel, and product redesign." },
  { icon: Users, title: "Week 3 — Roadmap", body: "Build a 3-year decarbonization plan with targets and owners." },
  { icon: CalendarCheck, title: "Week 4 — Pitch", body: "Present to a panel of practitioners; receive written feedback." },
];


export const stats = [
{ value: "Zimbabwe and Zambia", label: "Registered presence" },
{ value: "Representative and satellite presence within the SADC region", label: "Regional reach" },
{ value: "Seven connected service pillars", label: "Integrated model" },
{ value: "Africa RECs, ZAM-REC and ZIM-REC", label: "Market platforms" },
{ value: "AICTS Academy", label: "Learning platform" },
{ value: "Grow A Tree Foundation", label: "Community arm" },
];

export const courses = [
  {
    title: "Carbon Markets and Project Development ",
    src: "/services/carbonmarkets",
    description: "Opportunity screening, feasibility, baselines, methodology mapping, project documentation, MRV and market-readiness support.",
  },
  {
    title: "Article 6, Policy and Regulatory Advisory ",
     src: "/services/article6",
    description: "Carbon market policy, host-country systems, institutional frameworks, stakeholder consultation and implementation roadmaps.",
  },
  {
    title: "RECs and Energy Attribute Markets",
    src: "/services/recs",
    description: "Generator readiness, metering evidence, registry-related preparation, buyer education and Africa RECs market development.",
  },
  {
    title: "Carbon Footprint, GHG and ESG Services",
    src: "/services/esgfootprint",
    description: "emissions baselines, GHG inventories, ESG reporting, reduction roadmaps and executive sustainability briefings.",
  },
  {
    title: "MRV, Safeguards and Stakeholder Engagement",
    src: "/services/mrvsafeguard",
    description: "Monitoring frameworks, evidence files, FPIC support, consultations, safeguards and verification-readiness systems",
  },
  {
    title: "AICTS Academy ",
    src: "/academy",
    description: "Online learning, executive masterclasses, sector workshops and institutional capacity-building programmes.",
  },{
    title: "Climate Finance and Investor Readiness ",
    src: "/services/climatefinance",
    description: "Concept notes, investment briefs, carbon and REC value analysis, risk summaries and funder-facing documentation.",
  },
];

export const ico =[
     {src:"/gh.jpg",},
      {src:"/gw.jpg",},
       {src:"/gh.jpg",},
        {src:"/gw.jpg",}
]

export const features = [
  {
    icon: Leaf,
    title: "Carbon credit project development",
   
  },
  {
    icon: BarChart3,
    title: "Renewable Energy Certificate readiness and market development",
   
  },
  {
    icon: Globe,
    title: "Article 6, policy and regulatory advisory",
   
  },
  {
    icon: BookOpen,
    title: "Carbon footprinting, GHG inventories and ESG reporting",
  },
];

export const features2 = [
  {
    icon: Leaf,
    title: "MRV, safeguards and stakeholder engagement",
   
  },
  {
    icon: BarChart3,
    title: "Climate finance and investor readiness",
   
  },
  {
    icon: Globe,
    title: "AICTS Academy, research and capacity building",
   
  },
  {
    icon: BookOpen,
    title: "Grow A Tree Foundation community impact",
  },
];


export const iconByIndex = [Heart, Sparkles, Award];
export const vission = [
  {
    title: "Our Vision",
    description: "To be the leading institution in Africa for carbon trading education and sustainability, empowering individuals and organizations to drive impactful climate action and foster a resilient, low-carbon future for the continent." 
  },
  {
    title: "Our Mission",
    description: "To provide comprehensive, accessible, and practical education on carbon trading and sustainability, equipping our students with the knowledge and skills needed to effectively measure, reduce, and offset their carbon footprints, while fostering a community of climate-conscious leaders and innovators across Africa."
  }
]

export const principles = [
  { icon: ShieldCheck, title: "Integrity first", body: "We publish our standards, our reviewers, and the evidence base behind every methodology we teach." },
  { icon: FileSearch, title: "Independent review", body: "All case studies pass blind review by two external auditors before becoming part of the curriculum." },
  { icon: Scale, title: "Conflict-of-interest policy", body: "Faculty disclose advisory roles, equity, and project ties annually. Disclosures are public." },
  { icon: Eye, title: "Open methodology", body: "Calculation factors, assumptions, and uncertainty ranges ship with every tool we publish." },
  { icon: GitBranch, title: "Versioned guidance", body: "Standards evolve. Each release is dated, with a changelog and migration notes for prior cohorts." },
  { icon: BadgeCheck, title: "Verified outcomes", body: "Project claims we cite are MRV-backed under recognised registries (Verra, Gold Standard, ICVCM CCP)." },
];

export const standards = [
  { name: "GHG Protocol", role: "Corporate accounting" },
  { name: "ISO 14064", role: "Quantification & reporting" },
  { name: "SBTi", role: "Target validation" },
  { name: "ICVCM CCPs", role: "Credit integrity" },
  { name: "VCMI", role: "Claims integrity" },
  { name: "TCFD / ISSB", role: "Disclosure" },
];
