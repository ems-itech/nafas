import "./admin.css";
import type { ReactNode } from "react";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="admin-app">{children}</div>;
}
