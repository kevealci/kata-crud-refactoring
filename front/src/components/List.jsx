import React, { useContext , useEffect } from "react";
import { API_URL } from "../config";
import {TYPES} from "../actions/todoActions"
import { todoContext } from "../context/todoContext";
import {del, get, put} from "../util/helpHttp"

export const List = () => {
  const {state, dispatch } = useContext(todoContext);
  //console.log(`state`, state)
  
  useEffect(() => {
    const fetchTodos = async () => {
      const list = await get(API_URL+"/all")
      dispatch({ type: TYPES.UPDATE_LIST,list})
    }
    fetchTodos()
  }, [state]);

  const onDelete = async (id) => {
    await del(`${API_URL}/delete/${id}`)
    dispatch({ type: TYPES.DELETE_ITEM, id })
  };

  const onEdit = (todo) => {
    console.log(`todo`, todo)
    dispatch({ type: TYPES.EDIT_ITEM, item: todo })
  };

  const onChange = async(event, todos) => {
    const request = {
      name: todos.name,
      id: todos.id,
      completed: event.target.checked
    };

    const todo = await put(API_URL+"/update",{body:request})
    dispatch({ type: TYPES.UPDATE_CHECK, item: todo })

  };

  const decorationDone = {
    textDecoration: 'line-through'
  };

  return <div>
    <table >
      <thead>
        <tr>
          <td>ID</td>
          <td>Tarea</td>
          <td>¿Completado?</td>
        </tr>
      </thead>
      <tbody>
        {state?.list?.map((todo) => {
          return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
            <td><button onClick={() => onEdit(todo)}>Editar</button></td>
            <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}