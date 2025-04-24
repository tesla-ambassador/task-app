import { Sidebar } from "./sidebar";
import { SidebarHeader } from "./sidebar-header";
import { EmptyBoard } from "../board/dropdown-menu";

export function SidebarWrapper() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[300px] h-full sticky top-0 left-0">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="w-full sticky top-0 z-10 col-span-3">
          <SidebarHeader />
        </div>
        <div className="bg-[#F4F7FD] h-full w-full flex justify-center items-center">
          <EmptyBoard />
        </div>
      </div>
    </div>
  );
}
