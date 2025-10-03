'use client';

import React, { Children, cloneElement, isValidElement } from 'react';

type AnimatedListProps = {
  children: React.ReactNode;
  /** Base delay in milliseconds before first item animates */
  baseDelay?: number;
  /** Stagger delay in milliseconds between each child */
  stagger?: number;
  /** CSS class to apply to each child */
  className?: string;
};

export function AnimatedList({
  children,
  baseDelay = 0,
  stagger = 80,
  className,
}: AnimatedListProps) {
  const childArray = Children.toArray(children);

  return (
    <>
      {childArray.map((child, index) => {
        const delay = baseDelay + index * stagger;

        if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
          return cloneElement(child, {
            ...child.props,
            className: `${child.props.className || ''} ${className || ''}`.trim(),
            style: {
              ...child.props.style,
              animationDelay: `${delay}ms`,
            },
            key: child.key || index,
          });
        }

        return child;
      })}
    </>
  );
}
