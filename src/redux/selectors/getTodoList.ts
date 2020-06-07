import { createSelector } from "reselect";
import { RootState } from "../store";

const getTodoState = (state: RootState) => state.todoStateReducer.todo;

export const getTodoList = createSelector(getTodoState, (todo) => todo.filter(todo => todo.status === "TODO"));
export const getDoingList = createSelector(getTodoState, (todo) => todo.filter(todo => todo.status === "DOING"))
export const getDoneList = createSelector(getTodoState, (todo) => todo.filter(todo => todo.status === "DONE"))

