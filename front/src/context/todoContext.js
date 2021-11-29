import { createContext } from 'react';
import { todoInitialState } from '../reducers/todoReducer';

export const todoContext = createContext(todoInitialState);
