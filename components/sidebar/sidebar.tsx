"use client";
import React from "react";
import { Button } from "../ui/button";
import { useSidebarStore } from "@/providers/sidebar-provider";
import { AddNewBoard } from "../board/add-new-board";

import {
  BoardIcon,
  HideSidebarIcon,
  ShowSidebarIcon,
} from "../icons/sidebar-icons";

export function Sidebar() {
  const { boards, setActiveIndex, setFullWidth } = useSidebarStore(
    (state) => state
  );
  return (
    <div className="w-full bg-white">
      <div className="w-full h-[100px] flex items-center px-6">
        <img src={"/assets/logo-dark.svg"} alt="Logo" />
      </div>
      <div
        className={`flex flex-col justify-between h-full min-h-[90vh] pb-[50px]`}
      >
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
        <div className="pr-6">
          <div>Switch</div>
          <div className="hover:bg-[#A8A4FF]/50 overflow-hidden rounded-r-full px-4">
            <Button
              onClick={setFullWidth}
              className="bg-transparent w-full py-6 gap-4 cursor-pointer hover:bg-transparent justify-start group"
            >
              <HideSidebarIcon className="group-hover:fill-[#635FC7]" />
              <span className="text-[#828FA3] group-hover:text-[#635FC7]">
                Hide Sidebar
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BoardItem {
  boardName: string;
  setIsActive: (index: number) => void;
  index: number;
}

export function BoardItem({ boardName, setIsActive, index }: BoardItem) {
  const { activeIndex } = useSidebarStore((state) => state);
  return (
    <div
      className={`${
        index === activeIndex
          ? "bg-[#635FC7]"
          : "bg-white hover:bg-[#A8A4FF]/50"
      } group cursor-pointer rounded-r-full w-full px-4`}
    >
      <Button
        onClick={() => {
          setIsActive(index);
        }}
        className="bg-transparent w-full gap-4 justify-start hover:bg-transparent cursor-pointer py-6"
      >
        <BoardIcon
          className={`${
            index === activeIndex
              ? "fill-white hover:fill-white"
              : "group-hover:fill-[#635FC7]"
          }`}
        />
        <span
          className={`${
            index === activeIndex
              ? "text-white"
              : "text-[0.938rem] text-[#828FA3] group-hover:text-[#635FC7]"
          }`}
        >
          {boardName}
        </span>
      </Button>
    </div>
  );
}

export function ShowSidebar() {
  const { setFullWidth } = useSidebarStore((state) => state);
  return (
    <div className="bg-[#635FC7] hover:bg-[#A8A4FF]/50 py-3 rounded-r-full cursor-pointer max-w-[56px]">
      <Button
        onClick={setFullWidth}
        className="bg-transparent hover:bg-transparent cursor-pointer w-full justify-start"
      >
        <ShowSidebarIcon />
      </Button>
    </div>
  );
}
