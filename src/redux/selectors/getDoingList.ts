import { createSelector } from "reselect";
import { RootState } from "../store";

const getDoingState = (state: RootState) => state.todoStateReducer.todo;

export const getDoingList = createSelector(getDoingState, (todo) => todo.filter(todo => todo.status === "DOING"));

