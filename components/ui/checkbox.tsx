"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md border border-emerald-400/40 bg-white/10 backdrop-blur-sm",
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
      "disabled:opacity-50 data-[state=checked]:bg-emerald-400/20 data-[state=checked]:border-emerald-400",
      "transition-all duration-200 hover:bg-emerald-400/10",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-emerald-700")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
