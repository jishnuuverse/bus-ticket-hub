
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

export function BlurContainer({
  children,
  className,
  intensity = "medium",
}: BlurContainerProps) {
  const intensityClasses = {
    light: "bg-white/50 backdrop-blur-sm",
    medium: "bg-white/60 backdrop-blur-md",
    heavy: "bg-white/70 backdrop-blur-lg",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 shadow-sm transition-all duration-300",
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  );
}
