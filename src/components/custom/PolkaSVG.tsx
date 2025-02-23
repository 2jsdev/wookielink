interface PolkaSVGProps extends React.SVGProps<SVGSVGElement> {}

export function PolkaSVG({ className, ...props }: PolkaSVGProps) {
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
          id="polkaPattern"
          x="0"
          y="0"
          width="90"
          height="90"
          patternUnits="userSpaceOnUse"
        >
          <circle fill="currentColor" r="10" cx="45" cy="45">
            <animate
              attributeName="r"
              dur="4s"
              repeatCount="indefinite"
              values="10; 20; 10"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.65, 0, 0.35, 1; 0.65, 0, 0.35, 1"
            ></animate>
          </circle>
          <circle fill="currentColor" r="10" cx="0" cy="90">
            <animate
              attributeName="r"
              dur="4s"
              repeatCount="indefinite"
              values="10; 20; 10"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.65, 0, 0.35, 1; 0.65, 0, 0.35, 1"
            ></animate>
          </circle>
          <circle fill="currentColor" r="10" cx="90" cy="90">
            <animate
              attributeName="r"
              dur="4s"
              repeatCount="indefinite"
              values="10; 20; 10"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.65, 0, 0.35, 1; 0.65, 0, 0.35, 1"
            ></animate>
          </circle>
          <circle fill="currentColor" r="10" cx="90" cy="0">
            <animate
              attributeName="r"
              dur="4s"
              repeatCount="indefinite"
              values="10; 20; 10"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.65, 0, 0.35, 1; 0.65, 0, 0.35, 1"
            ></animate>
          </circle>
          <circle fill="currentColor" r="10" cx="0" cy="0">
            <animate
              attributeName="r"
              dur="4s"
              repeatCount="indefinite"
              values="10; 20; 10"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.65, 0, 0.35, 1; 0.65, 0, 0.35, 1"
            ></animate>
          </circle>
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#polkaPattern)"
      ></rect>
    </svg>
  );
}
