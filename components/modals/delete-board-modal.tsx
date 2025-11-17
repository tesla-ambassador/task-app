import React from "react";
import { DeleteDialog } from "../board/delete-dialog";

export default function DeleteBoardModal() {
  const deleteBoard = (theme: string) => {
    console.log(theme);
  };
  return (
    <>
      <DeleteDialog
        title="Platform Launch"
        type="board"
        handleDelete={deleteBoard}
      />
    </>
  );
}
