import {
  TodoActionType,
  TodoAddAction,
  TodoUpdateAction,
} from "../types/todoState";

let nextId = 0;
export function add(input: string): TodoAddAction {
  return {
    type: TodoActionType.Add,
    payload: {
      taskId: nextId++,
      taskName: input,
      status: "TODO",
    },
  };
}

export function update(id: number): TodoUpdateAction {
  return {
    type: TodoActionType.Update,
    payload: id
  };
}
