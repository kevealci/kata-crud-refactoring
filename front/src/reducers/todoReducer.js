import { UPDATE_LIST, ADD_ITEM, EDIT_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions/todoActions';

export const todoInitialState = {
  todo: { list: [], item: {} }
};

export function todoReducer(state, action) {
  switch (action.type) {
    case UPDATE_ITEM:
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      todoUpItem.list = listUpdateEdit;
      todoUpItem.item = {};
      return { ...state, todo: todoUpItem };
    case DELETE_ITEM:
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete };
    case UPDATE_LIST:
      const todoUpList = state.todo;
      todoUpList.list = action.list;
      return { ...state, todo: todoUpList };
    case EDIT_ITEM:
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit };
    case ADD_ITEM:
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: { list: todoUp, item: {} } };
    default:
      return state;
  }
}
