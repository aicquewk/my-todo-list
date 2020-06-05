import { TodoActionType, TodoAddAction, TodoUpdateAction } from "../types/todoState";

export function add(input: string): TodoAddAction {
  return {
    type: TodoActionType.Add,
    payload: { input },
  };
}

export function update(status: string): TodoUpdateAction {
  return {
    type: TodoActionType.Update,
    payload: { status },
  };
}
