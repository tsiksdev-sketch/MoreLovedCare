'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "aicts-cookie-consent-v1";
type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};
const loadPreferences = (): Preferences | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Preferences) : null;
  } catch {
    return null;
  }
};
const savePreferences = (prefs: Preferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent("aicts:cookie-consent", { detail: prefs }));
  } catch {
    /* ignore */
  }
};
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    const existing = loadPreferences();
    if (!existing) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);
  const persist = (a: boolean, m: boolean) => {
    savePreferences({
      necessary: true,
      analytics: a,
      marketing: m,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
    setShowSettings(false);
  };
  const acceptAll = () => persist(true, true);
  const rejectAll = () => persist(false, false);
  const saveChoices = () => persist(analytics, marketing);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          className="fixed inset-x-3 bottom-3 z-60 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl">
            <button
              onClick={rejectAll}
              aria-label="Dismiss and reject non-essential cookies"
              className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 id="cookie-title" className="font-heading text-base font-semibold">
                  We value your privacy
                </h2>
                <p id="cookie-desc" className="mt-1 text-sm text-muted-foreground">
                  MoreLovedCare uses cookies to keep the site running, understand how it
                  is used and improve your experience. See our{" "}
                  <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {showSettings && (
                <motion.div
                  key="settings"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3 rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">Strictly necessary</p>
                        <p className="text-xs text-muted-foreground">Required for core site functionality.</p>
                      </div>
                      <Switch checked disabled />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">Analytics</p>
                        <p className="text-xs text-muted-foreground">Anonymous usage to improve content.</p>
                      </div>
                      <Switch checked={analytics} onCheckedChange={setAnalytics} />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">Marketing</p>
                        <p className="text-xs text-muted-foreground">Personalise content and outreach.</p>
                      </div>
                      <Switch checked={marketing} onCheckedChange={setMarketing} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {showSettings ? (
                <>
                  <Button size="sm" onClick={saveChoices} className="flex-1">
                    Save preferences
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowSettings(false)}>
                    Back
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" onClick={acceptAll} className="flex-1">
                    Accept all
                  </Button>
                  <Button size="sm" variant="outline" onClick={rejectAll} className="flex-1">
                    Reject
                  </Button>
                  <Button
                    size="sm"
                   
                    onClick={() => setShowSettings(true)}
                    className="w-full md:w-auto"
                  >
                    Customise
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CookieConsent;