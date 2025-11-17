import { createStore } from "zustand";
import data from "@/data.json";
import { Board, Column } from "@/types/boardtypes";

export type SidebarState = {
  isFullWidth: boolean;
  activeIndex: number;
  boards: Board[];
};

export type SidebarActions = {
  createNewBoard: (newBoard: Board) => void;
  deleteBoard: (boardName: string) => void;
  addColumn: (newColumn: Column, boardName: string) => void;
  setActiveIndex: (newIndex: number) => void;
  setFullWidth: () => void;
};

export type SidebarStore = SidebarState & SidebarActions;

const defaultState: SidebarState = {
  isFullWidth: true,
  activeIndex: 0,
  boards: data.boards,
};

export const createSidebarStore = (initState: SidebarState = defaultState) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    createNewBoard: (newBoard) =>
      set((state) => ({ boards: [...state.boards, newBoard] })),
    deleteBoard: (boardName) =>
      set((state) => ({
        boards: state.boards.filter((board) => board.name !== boardName),
      })),
    addColumn: (newColumn, boardName) =>
      set((state) => {
        const boardToAddTo = state.boards.find(
          (board) => board.name === boardName,
        );
        if (!boardToAddTo) {
          return state;
        }

        return {
          boards: state.boards.map((board) =>
            board === boardToAddTo
              ? { ...board, columns: [...board.columns, newColumn] }
              : board,
          ),
        };
      }),
    setActiveIndex: (number) =>
      set((state) => ({ activeIndex: (state.activeIndex = number) })),
    setFullWidth: () => set((state) => ({ isFullWidth: !state.isFullWidth })),
  }));
};
