import { TodoState, TodoActionType } from "../types/todoState";

export const initialState: TodoState = {
  todo: [],
};

function todoReducer(state = initialState, action: any): TodoState {
  switch (action.type) {
    case TodoActionType.Add:
      return { ...state, todo: [...state.todo, action.payload] };
    case TodoActionType.Update:
      // return state.todo.map(item => (
      //   item.taskID === action.payload ? console.log("MATCHED") : console.log("NOT MATCHED")
      // ));
      // state.todo.map((item) =>
      //   item.taskID === action.payload
      //     ? item.status === "TODO"
      //       ? console.log({ ...state, status: "DOING" })
      //       : console.log("ANOTHERSTATUS")
      //     : console.log("NOT MATCHED")
      return {
        ...state,
        todo: state.todo.map((item, index) =>
          index === action.payload ? { ...item, status: "DOING" } : item
        ),
      };
    // return state;
    default:
      return state;
  }
}

export default todoReducer;
