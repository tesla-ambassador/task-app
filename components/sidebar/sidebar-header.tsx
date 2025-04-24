"use client";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { VerticleEllipsis } from "../icons/sidebar-icons";
import { useSidebarStore } from "@/providers/sidebar-provider";
import { BoardDropDown } from "../board/dropdown-menu";

export function SidebarHeader() {
  const { activeIndex, boards } = useSidebarStore((state) => state);
  return (
    <div className="flex justify-between items-center bg-white w-full h-25 text-white px-12 border-l-[1px] border-b-[1px] border-[#E4EBFA]">
      <h1 className="text-black text-[1.875rem] font-bold">
        {boards[activeIndex].name}
      </h1>
      <div className="flex items-center gap-4">
        <Button className="rounded-l-full rounded-r-full py-6 px-7 bg-[#635FC7] cursor-pointer hover:bg-[#A8A4FF]">
          <span>+ Add New Task</span>
        </Button>
        <BoardDropDown />
      </div>
    </div>
  );
}
