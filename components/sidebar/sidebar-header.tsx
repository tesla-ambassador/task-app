"use client";
import React from "react";
import { useSidebarStore } from "@/providers/sidebar-provider";
import { BoardDropDown } from "../board/dropdown-menu";
import AddNewTaskDialog from "../board/add-new-task";

import { AddNewBoard } from "../board/add-new-board";
import { BoardItem } from "./sidebar";

import { useMediaQuery } from "@/hooks/media-query-hook";

import { ChevronDownIcon } from "../icons/sidebar-icons";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  DrawerTitle,
  DrawerHeader,
} from "../ui/drawer";

export function SidebarHeader() {
  // I didn't want to use CSS media queries... Not that I'm against them but that's some amateur shit.
  const isMobile = useMediaQuery("(max-width: 639px)");

  const { activeIndex, boards } = useSidebarStore((state) => state);
  return (
    <div className="flex justify-between items-center bg-white w-full h-25 text-white px-4 md:px-12 border-l-[1px] border-b-[1px] border-[#E4EBFA]">
      {isMobile ? (
        <MobileMenuDropdown />
      ) : (
        <h1 className="text-black text-lg lg:text-[1.875rem] font-bold">
          {boards[activeIndex].name}
        </h1>
      )}
      <div className="flex items-center gap-2 md:gap-4">
        <AddNewTaskDialog />
        <BoardDropDown />
      </div>
    </div>
  );
}

export function MobileMenuDropdown() {
  const { activeIndex, boards, setActiveIndex } = useSidebarStore(
    (state) => state
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <div className="flex items-center gap-3">
          <h1 className="text-black text-lg lg:text-[1.875rem] font-bold">
            {boards[activeIndex].name}
          </h1>
          <ChevronDownIcon
            className={
              isOpen
                ? "rotate-180 transition-all duration-150 ease-in-out"
                : "rotate-0 transition-all duration-150 ease-in-out"
            }
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Mobile Menu</DrawerTitle>
          <DrawerDescription>
            This is the mobile menu that contains all boards and the button to
            create a new one
          </DrawerDescription>
        </DrawerHeader>
        <div className={`flex flex-col justify-between pb-10`}>
          <div className="pr-6 space-y-4">
            <div className="px-6">
              <span>ALL BOARDS ({boards.length})</span>
            </div>
            <div>
              {boards.map((board, index) => (
                <BoardItem
                  key={index}
                  boardName={board.name}
                  index={index}
                  setIsActive={setActiveIndex}
                />
              ))}
            </div>
            <div className="w-full">
              <AddNewBoard />
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div>Switch</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
