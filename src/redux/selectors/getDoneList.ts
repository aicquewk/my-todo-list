import { createSelector } from "reselect";
import { RootState } from "../store";

const getDoneState = (state: RootState) => state.todoStateReducer.todo;

export const getDoneList = createSelector(getDoneState, (todo) => todo.filter(todo => todo.status === "DONE"));

