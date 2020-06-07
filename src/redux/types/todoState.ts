export interface Todo{
  id: number
  title: string
  description: string
  status: string
}

export interface TodoState {
  todo: Todo[];
}

export enum TodoActionType {
  Add = "Todo/Add",
  Update = "Todo/Update",
}

export interface TodoAddAction {
  type: TodoActionType.Add;
  payload: Todo
}

export interface TodoUpdateAction {
  type: TodoActionType.Update;
  payload: number
}
