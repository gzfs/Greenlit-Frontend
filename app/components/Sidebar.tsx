"use client";

import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  MaterialSymbolsBarChart4BarsRounded,
  MaterialSymbolsGlobe,
  MaterialSymbolsLightDocumentScannerRounded,
  SolarBuildings3Bold,
  SolarLogout2Bold,
  SolarLogin3Bold,
} from "./Icons";
import { usePathname } from "next/navigation";
import { PAGES } from "../page";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

export default function Sidebar({
  currentPage,
  setCurrentPage,
}: {
  currentPage: PAGES;
  setCurrentPage: (page: PAGES) => void;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);

  const menuItems = [
    {
      icon: MaterialSymbolsBarChart4BarsRounded,
      label: "Dashboard",
      href: "/",
      page: PAGES.ONBOARDING,
    },
    {
      icon: MaterialSymbolsLightDocumentScannerRounded,
      label: "Reports",
      href: "/reports",
      page: PAGES.GOVERNANCE,
    },
    {
      icon: MaterialSymbolsGlobe,
      label: "Governance",
      href: "/governance",
      page: PAGES.GOVERNANCE,
    },
    {
      icon: MaterialSymbolsLightDocumentScannerRounded,
      label: "CSR Evaluation",
      href: "/csr",
      page: PAGES.CSR,
    },
    {
      icon: MaterialSymbolsBarChart4BarsRounded,
      label: "ESG Score",
      href: "/esg",
      page: PAGES.ESG,
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition(e.clientX);
      if (e.clientX < 50) {
        setIsVisible(true);
      } else if (e.clientX > 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onMouseLeave={() => setIsVisible(false)}
          className="fixed left-0 top-0 w-64 md:w-72 h-screen 
            bg-white/5 backdrop-blur-lg 
            border-r border-white/20
            hover:border-emerald-200/20
            text-emerald-700 p-4 md:p-6 
            flex flex-col justify-between 
            z-50
            transition-all duration-300"
        >
          <div>
            <div className="mb-5 relative">
              <Link href="/dashboard" className="block">
                <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-emerald-700/90">
                  greenlit
                </h1>
                <div className="absolute -inset-3 bg-emerald-500/10 blur-2xl rounded-full -z-10" />
              </Link>
            </div>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.label}
                    onClick={() => setCurrentPage(item.page)}
                  >
                    <motion.li
                      whileHover={{
                        x: 5,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                      className={`
                        flex items-center p-3 rounded-xl
                        transition-all duration-300 cursor-pointer
                        backdrop-blur-sm border border-transparent
                        hover:border-white/20
                        hover:shadow-[0_0_25px_0_rgba(16,185,129,0.1)]
                        ${
                          pathname === item.href
                            ? "bg-emerald-600/20 text-emerald-700 font-medium border-emerald-400/20"
                            : "hover:bg-white/5"
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="text-sm md:text-base">{item.label}</span>
                    </motion.li>
                  </Link>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-auto">
            {session ? (
              <motion.div
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="flex items-center p-3 rounded-xl
                  cursor-pointer transition-all duration-300
                  backdrop-blur-sm border border-transparent
                  hover:border-white/20 hover:bg-white/5
                  hover:shadow-[0_0_25px_0_rgba(16,185,129,0.1)]"
              >
                <SolarLogout2Bold className="w-5 h-5 mr-3" />
                <span className="text-sm md:text-base">Logout</span>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="flex items-center p-3 rounded-xl
                  cursor-pointer transition-all duration-300
                  backdrop-blur-sm border border-transparent
                  hover:border-white/20 hover:bg-white/5
                  hover:shadow-[0_0_25px_0_rgba(16,185,129,0.1)]"
              >
                <SolarLogin3Bold className="w-5 h-5 mr-3" />
                <span className="text-sm md:text-base">Login</span>
              </motion.div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
