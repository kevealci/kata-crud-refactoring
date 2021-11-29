import { useContext , useEffect } from "react";
import { API_URL } from "../config";
import {DELETE_ITEM,UPDATE_LIST} from "../actions/todoActions"
import { todoContext } from "../context/todoContext";
import {del, get, put} from "../util/helpHttp"

export const List = () => {
  const { dispatch, state } = useContext(todoContext);
  
  useEffect(() => {

    const getTodos = async () => {
      return await get(API_URL+"/all")
    }
    const list = getTodos();
    dispatch({ type:UPDATE_LIST, list })
  }, [dispatch]);

  const onDelete = async (id) => {
    await del(`${API_URL}/delete/${id}`)
    dispatch({ type: DELETE_ITEM, id })
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  const onChange = (event, todo) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked
    };

    const todo = await put(API_URL+"/update",{body:request})
    dispatch({ type: "update-item", item: todo })

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
        {state.list.map((todo) => {
          return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
            <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
            <td><button onClick={() => onEdit(todo)}>Editar</button></td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}