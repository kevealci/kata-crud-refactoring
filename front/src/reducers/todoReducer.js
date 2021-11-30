import { TYPES } from '../actions/todoActions';

export const todoInitialState = {
  todo: { list: [], item: {} }
};

export function todoReducer(state, action) {
  switch (action.type) {
    case TYPES.UPDATE_CHECK:
      const listCheck = state.list.map((item) => {
        console.log(`item on check`, item);
        if (item.id === action.id) {
          return action.item;
        }
        return item;
      });
      return { ...state, list: listCheck };
    case TYPES.UPDATE_ITEM:
      console.log(`action.item en reducer`, action.item);
      const listEdit = state.list.map((item) => {
        console.log(`item on update`, item);
        if (item.id === action.id) {
          return action.item;
        }
        return item;
      });
      return { ...state, list: listEdit, item: {} };
    case TYPES.DELETE_ITEM:
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete };
    case TYPES.UPDATE_LIST:
      return { ...state, list: action.list };
    case TYPES.EDIT_ITEM:
      return { ...state, item: action.item };
    case TYPES.ADD_ITEM:
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: { list: todoUp, item: {} } };
    default:
      return state;
  }
}
