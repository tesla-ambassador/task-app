import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { VerticleEllipsis } from "../icons/sidebar-icons";
import { Button } from "../ui/button";

export function BoardDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <VerticleEllipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2">
        <DropdownMenuLabel className="sr-only">Board Actions</DropdownMenuLabel>
        <DropdownMenuItem>Edit Board</DropdownMenuItem>
        <DropdownMenuItem>Delete Board</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EmptyBoard() {
  return (
    <div className="text-center w-full max-w-[500px] flex flex-col items-center justify-center gap-8">
      <div>
        <h2 className="text-[1.125rem] text-[#828FA3]">
          This board is empty. Create a new column to get started
        </h2>
      </div>
      <div>
        <Button className="rounded-l-full rounded-r-full py-6 bg-[#635FC7] cursor-pointer hover:bg-[#A8A4FF]">
          <span>+ Add New Column</span>
        </Button>
      </div>
    </div>
  );
}
