import React, { useContext , useRef, useState } from "react";
import { todoContext } from "../context/todoContext";
import { API_URL } from "../config";
import {post, put} from "../util/helpHttp"
import {TYPES} from "../actions/todoActions"

export const Form = () => {

  const formRef = useRef(null);
  const { dispatch, state: { item } } = useContext(todoContext);
  const [stateForm, setStateForm] = useState({item});

  const onAdd = async (event) => {

    event.preventDefault();

    const request = {
      name: stateForm.name,
      id: null,
      completed: false
    };

    const todo = await post(`${API_URL}/save`, {body:request})

    dispatch({ type: TYPES.ADD_ITEM, item: todo });

    setStateForm({ name: "" });

    formRef.current.reset();
  }

  const onEdit = async (event) => {
    event.preventDefault();
    console.log(`item`, item)
    const request = {
      name: item.name,
      id: item.id,
      is_completed: item.isCompleted
    };

    const todo = await put(`${API_URL}/update`, {body: request})
    console.log(`todo on edit`, todo)

    dispatch({ type: TYPES.UPDATE_ITEM, item: todo });

    setStateForm({ name:"" });

    formRef.current.reset();
  }

  return <form ref={formRef}>
    <input 
      type="text" 
      name="name" 
      placeholder="¿Qué piensas hacer hoy?" 
      defaultValue={item?.name}
      onChange={(event) => {setStateForm({ ...stateForm, name: event.target.value })}}  
    />
    {item?.id && <button onClick={onEdit}>Actualizar</button>}
    {!item?.id && <button onClick={onAdd}>Crear</button>}
  </form>
}