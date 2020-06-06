import { TodoActionType, TodoAddAction, TodoUpdateAction } from "../types/todoState";

export function add(input: string): TodoAddAction {
  return {
    type: TodoActionType.Add,
    payload: {
      taskName: input,
      status: "TODO"
    }
  };
}

export function update(status: string): TodoUpdateAction {
  return {
    type: TodoActionType.Update,
    payload: { status },
  };
}
