import { TodoState, TodoAddAction, TodoActionType } from "../types/todoState";

export const initialState: TodoState = {
  todo: ["Complete the assignment"],
};

function todoReducer(state = initialState, action: TodoAddAction): TodoState {
  switch (action.type) {
    case TodoActionType.Add:
      return { ...state, todo: [...state.todo, action.payload.input] };
    default:
      return state;
  }
}

export default todoReducer;
