interface ZigZagSVGProps extends React.SVGProps<SVGSVGElement> {}

export function ZigZagSVG({ className, ...props }: ZigZagSVGProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="currentColor"
    >
      <defs>
        <pattern
          id="zigZagPattern"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <defs>
            <polygon
              id="zigZagShape"
              fill="currentColor"
              points="120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120"
            ></polygon>
          </defs>
          <g>
            <use href="#zigZagShape" x="0" y="-120"></use>
            <use href="#zigZagShape" x="0" y="0"></use>
            <animateTransform
              attributeName="transform"
              type="translate"
              keyTimes="0;1"
              repeatCount="indefinite"
              dur="2s"
              values="0 0; 0 120"
            ></animateTransform>
          </g>
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#zigZagPattern)"
      ></rect>
    </svg>
  );
}
