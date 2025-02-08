"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 rounded-xl",
        "border border-white/20",
        "bg-white/10 backdrop-blur-sm",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/20",
        "transition-all duration-200",
        "placeholder:text-emerald-800/20 text-emerald-800",
        "shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05)]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
