"use client";
import { Sidebar } from "./sidebar";
import { SidebarHeader } from "./sidebar-header";
import { useSidebarStore } from "@/providers/sidebar-provider";
import { ShowSidebar } from "./sidebar";
import { Board } from "../board/board";

export function SidebarWrapper() {
  const { isFullWidth } = useSidebarStore((state) => state);
  return (
    <div
      className={
        isFullWidth
          ? "md:grid grid-cols-[300px_1fr] gap-0 h-screen overflow-hidden bg-blue-500"
          : "md:grid grid-cols-[0px_1fr] gap-0 h-screen overflow-hidden bg-blue-500"
      }
    >
      <div
        className={`${
          isFullWidth
            ? "col-start-1 sticky top-0 left-0"
            : "absolute w-[56px] bottom-12 left-0 z-50"
        } transition-all duration-150 ease-in-out hidden md:block`}
      >
        {isFullWidth ? (
          <>
            <Sidebar />
          </>
        ) : (
          <>
            <ShowSidebar />
          </>
        )}
      </div>
      <div className="w-full overflow-auto col-start-2">
        <SidebarHeader />
        <div className="w-full overflow-x-auto bg-[#F4F7FD] p-4 md:p-8">
          <Board />
        </div>
      </div>
    </div>
  );
}
