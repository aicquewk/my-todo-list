import { TodoState, TodoActionType } from "../types/todoState";

export const initialState: TodoState = {
  todo: [],
};


function todoReducer(state = initialState, action: any): TodoState {
  switch (action.type) {
    case TodoActionType.Add:
      return { ...state, todo: [...state.todo, action.payload] };
    case TodoActionType.Update:
      return { ...state, todo: [...state.todo, action.payload.status] };
    default:
      return state;
  }
}

export default todoReducer;
