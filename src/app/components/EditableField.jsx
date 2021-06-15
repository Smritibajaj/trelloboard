import React, { useRef, useState } from "react";
import Editable from "./Editable";

function Field(props) {
  const inputRef = useRef();
  const { column , item ,state , setState} = props;
  const [task, setTask] = useState(item.content);

  const changeContent = (e) => {
    setTask(e.target.value);
    const changedCategory = [ ...state[props.column]];
    const newState = [...state];
    const changedItem = changedCategory.map((citem) => {
      if(props.item.id === citem.id ) citem.content = e.target.value;
      return citem;
    });
    newState[column] = changedItem;
    setState([...newState]);
    //JSON.stringify(newState);
    //localStorage.setItem("storedData", newState);
  }

  return (
    <div className="w-full max-w-md mx-auto">
        <div className="px-4 pb-4">
          <Editable
            text={task}
            placeholder="Write a task name"
            childRef={inputRef}
            type="input"
          >
            <input
              ref={inputRef}
              type="text"
              name="task"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Task name"
              value={task}
              onChange={e => changeContent(e)}
            />
          </Editable>
        </div>
    </div>
  );
}

export default Field;