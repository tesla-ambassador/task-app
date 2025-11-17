import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { VerticleEllipsis } from "../icons/sidebar-icons";

import { EditBoard } from "./edit-board";
import DeleteBoardModal from "../modals/delete-board-modal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";

export function BoardDropDown() {
  const testFunction = (teststr: number | string) => {
    console.log(teststr);
  };
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <VerticleEllipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-2">
          <DropdownMenuLabel className="sr-only">
            Board Actions
          </DropdownMenuLabel>
          <DialogTrigger
            onClick={() => {
              setIsEdit(true);
            }}
            asChild
          >
            <DropdownMenuItem className="text-[#201F24] focus:cursor-pointer focus:text-[#201F24]">
              Edit Board
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger
            onClick={() => {
              setIsEdit(false);
            }}
            asChild
          >
            <DropdownMenuItem className="text-[#C94736] focus:cursor-pointer focus:text-[#C94736]">
              Delete Board
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>Edit or Delete a board</DialogTitle>
          <DialogDescription>
            This Dialog contains the form to edit a pot and the model to delete
            a Board rendered conditionally
          </DialogDescription>
        </DialogHeader>
        {isEdit ? <EditBoard /> : <DeleteBoardModal />}
      </DialogContent>
    </Dialog>
  );
}
