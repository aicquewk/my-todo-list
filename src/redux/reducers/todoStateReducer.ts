import { TodoState, TodoActionType } from "../types/todoState";

export const initialState: TodoState = {
  todo: [],
};

function todoReducer(state = initialState, action: any): TodoState {
  switch (action.type) {
    case TodoActionType.Add:
      return { ...state, todo: [...state.todo, action.payload] };
    case TodoActionType.Update:
      return {
        ...state,
        todo: state.todo.map((item, id) =>
          id === action.payload
            ? item.status === "TODO"
              ? { ...item, status: "DOING" }
              : { ...item, status: "DONE" }
            : item
        ),
      };
    default:
      return state;
  }
}

export default todoReducer;
