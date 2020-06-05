import { TodoActionType, TodoUpdateAction } from "../types/todoState";

export function add(input: string): TodoUpdateAction {
  return {
    type: TodoActionType.Update,
    payload: { input },
  };
}
