import {
  TodoActionType,
  TodoAddAction,
  TodoUpdateAction,
} from "../types/todoState";

let nextId = 0;
export function add(title: string, description: string): TodoAddAction {
  return {
    type: TodoActionType.Add,
    payload: {
      id: nextId++,
      title: title,
      description: description,
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
