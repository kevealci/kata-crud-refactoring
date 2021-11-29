import { useContext , useRef, useState } from "react";
import { todoContext } from "../context/todoContext";
import { API_URL } from "../config";
import {post, put} from "../util/helpHttp"
import {ADD_ITEM, UPDATE_ITEM} from "../actions/todoActions"

export const Form = () => {

  const formRef = useRef(null);
  const { dispatch, state: { item } } = useContext(todoContext);
  const [state, setState] = useState({item});

  const onAdd = async (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: null,
      completed: false
    };

    const todo = await post(API_URL+"/save", {body:request})

    dispatch({ type: ADD_ITEM, item: todo });
    setState({ name: "" });
    formRef.current.reset();
  
  }

  const onEdit = async (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted
    };

    const todo = await put(API_URL+"/update", {body: request})
    
    dispatch({ type: UPDATE_ITEM, item: todo });
    setState({ name: "" });
    formRef.current.reset();
  }

  return <form ref={formRef}>

    <input 
      type="text" 
      name="name" 
      placeholder="¿Qué piensas hacer hoy?" 
      defaultValue={item.name}
      onChange={(event) => {setState({ ...state, name: event.target.value })}}  />

    {item.id && <button onClick={onEdit}>Actualizar</button>}
    {!item.id && <button onClick={onAdd}>Crear</button>}

  </form>
}