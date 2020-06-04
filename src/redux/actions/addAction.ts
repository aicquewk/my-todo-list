import { TodoActionType, TodoAddAction } from "../types/todoState";

export function add(input: string): TodoAddAction {
  return {
    type: TodoActionType.Add,
    payload: { input },
  };
}
