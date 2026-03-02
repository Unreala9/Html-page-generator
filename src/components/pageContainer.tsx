import React from "react";

export default function PageContainer({
  children,
  allowScroll = false,
  className = "",
}: React.PropsWithChildren<{ allowScroll?: boolean; className?: string }>) {
  if (allowScroll) {
    return (
      <div className={`min-h-screen w-full overflow-x-hidden ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`h-screen w-full overflow-hidden ${className}`}>
      <div className="flex h-full w-full overflow-hidden">
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
