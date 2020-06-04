import { createSelector } from "reselect";
import { RootState } from "../store";

const getTodoState = (state: RootState) => state.todoStateReducer.todo;

export const getTodoList = createSelector(getTodoState, (todo) => todo);
