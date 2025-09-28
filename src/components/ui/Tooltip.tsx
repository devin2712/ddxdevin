"use client";

import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  sideOffset?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delayDuration = 100,
  sideOffset = 5,
}) => {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={styles.tooltipContent}
            sideOffset={sideOffset}
            collisionPadding={8}
            avoidCollisions={true}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};