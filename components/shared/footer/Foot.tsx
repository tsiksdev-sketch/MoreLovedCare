
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Foot() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/moreloved-logo.png" height={100} width={100} alt="MoreLoved Care" className="h-20 w-30 w-auto mb-5 brightness-0 invert opacity-90" />
          <p className="text-sm opacity-80 leading-relaxed max-w-sm">
            MoreLoved Care Ltd provides assessed home care and Personal care in Nottingham
            and agreed areas of Nottinghamshire compassionate relationships, person-centred
            planning, staff competence and visible accountability. From Us to You.
          </p>
          <div className="mt-6 space-y-2 text-sm opacity-90">
            <a href="tel:01156812514" className="flex items-center gap-2 hover:opacity-100"><Phone className="w-4 h-4" /> 0115 681 2514</a>
            <a href="mailto:hello@morelovedcare.co.uk" className="flex items-center gap-2 hover:opacity-100"><Mail className="w-4 h-4" /> hello@morelovedcare.co.uk</a>
            <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /> Sovereign House, 184 Nottingham Road, Nottingham, NG7 7BA</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase opacity-70">Care</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#services" className="hover:opacity-100">Personal care</a></li>
            <li><a href="#services" className="hover:opacity-100">Older people</a></li>
            <li><a href="#services" className="hover:opacity-100">Dementia support</a></li>
            <li><a href="#services" className="hover:opacity-100">Disability support</a></li>
            <li><a href="#services" className="hover:opacity-100">Children & young people</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase opacity-70">Company</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#about" className="hover:opacity-100">About us</a></li>
            <li><a href="#quality" className="hover:opacity-100">Quality</a></li>
            <li><a href="#careers" className="hover:opacity-100">Careers</a></li>
            <li><a href="#advice" className="hover:opacity-100">Advice hub</a></li>
            <li><a href="#contact" className="hover:opacity-100">Contact</a></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase opacity-70">Regulated care</h4>
          <div className="rounded-2xl border border-primary-foreground/20 p-5 bg-primary-foreground/5">
            <p className="text-sm opacity-90 leading-relaxed">
              <strong className="font-semibold">CQC overall rating: Good</strong><br />
              Registered activity: Personal care<br />
              Provider ID: 1-9848800802<br />
              Location ID: 1-14157488363
            </p>
            <a href="#cqc" className="mt-3 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 hover:no-underline">
              View official CQC profile →
            </a>
          </div>
        </div>
      </div>

      <div className="container-x mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col md:flex-row gap-4 justify-between text-xs opacity-70">
        <p>© 2026 MoreLoved Care Ltd. Company no. 12932401. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="#" className="hover:opacity-100">Privacy</a>
       
          <a href="#" className="hover:opacity-100">Accessibility</a>
          <a href="#" className="hover:opacity-100">Terms</a>
          <a href="#" className="hover:opacity-100">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
