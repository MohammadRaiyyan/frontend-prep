import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense } from "react";
import type { IconProps } from "../../config/sidebar";

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={<div />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default Icon;
