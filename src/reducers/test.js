import { INCREMENT } from "../actions";

export function count(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return action.payload.count;
    default:
      return state;
  }
}
