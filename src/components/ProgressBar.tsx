"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

type Props = {
  isLoading: boolean;
};

export function ProgressBar({ isLoading }: Props) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (isLoading) {
      setProgress(10);
      const timer = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 50);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  return (
    <Progress value={progress} className="w-[100%] h-0.5 transition-all" />
  );
}
