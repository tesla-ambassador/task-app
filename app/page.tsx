import Image from "next/image";
import { SidebarWrapper } from "@/components/sidebar/sidebar-wrapper";

export default function Home() {
  return (
    <div className="w-full h-screen bg-black">
      <SidebarWrapper />
    </div>
  );
}
