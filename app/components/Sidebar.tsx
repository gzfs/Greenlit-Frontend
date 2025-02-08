"use client";

import React from "react";
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

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const menuItems = [
    {
      icon: MaterialSymbolsBarChart4BarsRounded,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: MaterialSymbolsLightDocumentScannerRounded,
      label: "Reports",
      href: "/reports",
    },
    {
      icon: SolarBuildings3Bold,
      label: "Company Profile",
      href: "/company-profile",
    },
    {
      icon: MaterialSymbolsGlobe,
      label: "Global Metrics",
      href: "/global-metrics",
    },
    {
      icon: MaterialSymbolsLightDocumentScannerRounded,
      label: "CSR Evaluation",
      href: "/csr",
    },
  ];

  return (
    <aside className="w-64 bg-white text-emerald-400 p-6 flex flex-col justify-between m-3 rounded-3xl border border-emerald-400/40">
      <div>
        <div className="mb-5">
          <Link href="/dashboard" className="block">
            <h1 className="text-4xl font-medium tracking-tighter text-emerald-400">
              greenlit
            </h1>
          </Link>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <Link href={item.href} key={item.label}>
                <li
                  className={`
                    flex items-center p-3 rounded-xl transition-all duration-300 cursor-pointer border border-transparent 
                    ${
                      pathname === item.href
                        ? "bg-emerald-600 text-white"
                        : "hover:border hover:border-emerald-400/40"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-auto">
        {session ? (
          <div
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 border border-transparent hover:border hover:border-emerald-400/40"
          >
            <SolarLogout2Bold className="w-5 h-5 mr-3" />
            Logout
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="flex items-center p-3 rounded-lg border border-transparent transition-all duration-300 cursor-pointer hover:border hover:border-emerald-400/40"
          >
            <SolarLogin3Bold className="w-5 h-5 mr-3" />
            Login
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
