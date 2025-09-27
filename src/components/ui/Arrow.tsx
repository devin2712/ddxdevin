import React from "react";

type ArrowProps = {
  className?: string;
  size?: number;
  color?: string;
}

export const Arrow: React.FC<ArrowProps> = ({
  className,
  size = 16,
  color = "currentColor"
}) => {
  const width = size;
  const height = Math.round(size * (14/16));

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.25 7L1.25 10M1.25 10L4.25 13M1.25 10H10.25C11.4435 10 12.5881 9.52589 13.432 8.68198C14.2759 7.83807 14.75 6.69347 14.75 5.5C14.75 4.30653 14.2759 3.16193 13.432 2.31802C12.5881 1.47411 11.4435 1 10.25 1H8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Arrow.displayName = "Arrow";