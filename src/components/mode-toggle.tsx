"use client"

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "./global/action-tooltip";
import { QISTAT_CONSTANTS } from "@/constants";

type ModeToggleProps = {
  title?: string;
};

export function ModeToggle({ title }: ModeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <div className="space-y-2">
      <div className=" flex justify-between space-x-2">
      {/* {title && <span className="text-sm">{title}</span>} */}
        {QISTAT_CONSTANTS.modetoggle.map((item) => (
          <ActionTooltip
            key={item.id}
            side="top"
            align="center"
            label={item.label}
          >
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(item.label.toLowerCase())}
            >
              {item.icon}
            </Button>
          </ActionTooltip>
        ))}
      </div>
    </div>
  );
}
