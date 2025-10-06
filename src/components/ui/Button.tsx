import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./Button.module.css";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  children: React.ReactNode;
};

type ButtonAsLink = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'popover'> & {
  as: "link";
  href: string;
  children: React.ReactNode;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, children, ...props }, ref) => {
  const buttonClass = `${styles.button} ${className || ""}`;

  if (props.as === "link") {
    const { as: _as, ...linkProps } = props as ButtonAsLink;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={buttonClass}
        prefetch={true}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const { as: _as, ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={buttonClass}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";