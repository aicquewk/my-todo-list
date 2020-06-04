export interface TodoState {
  todo: string[];
}

export enum TodoActionType {
  Add = "Todo/Add",
}

export interface TodoAddAction {
  type: TodoActionType.Add;
  payload: {
    input: string;
  };
}
