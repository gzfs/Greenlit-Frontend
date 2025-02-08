"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/10 group-[.toaster]:backdrop-blur-lg group-[.toaster]:border-emerald-400/40 group-[.toaster]:text-emerald-800 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-emerald-600",
          actionButton:
            "group-[.toast]:bg-emerald-700/50 group-[.toast]:text-emerald-50",
          cancelButton:
            "group-[.toast]:bg-emerald-100 group-[.toast]:text-emerald-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
