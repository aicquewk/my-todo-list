export interface TodoState {
  todo: string[];
}

export enum TodoActionType {
  Add = "Todo/Add",
  Update = "Todo/Update",
}

export interface TodoAddAction {
  type: TodoActionType.Add;
  payload: {
    input: string;
  };
}

export interface TodoUpdateAction {
  type: TodoActionType.Update;
  payload: {
    input: string;
  };
}