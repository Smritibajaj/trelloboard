import React, { useState, useEffect } from "react";
import "./app/styles/index.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  getItems,
  getItemStyle,
  reorder,
  move,
  getListStyle,
} from "./app/utils";
import Field from "./app/components/EditableField";

function App() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div className="h-full w-full">
      <header className="flex flex-row justify-between items-center py-2 px-8">
        <h1 className="text-bold text-indigo-700 text-3xl">Trello Board</h1>
        <div className="flex flex-row">
          <button
            type="button"
            className="flex flex-row text-white bg-indigo-700 py-2 px-4 m-4 rounded"
            onClick={() => {
              setState([...state, []]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add new category</span>
          </button>
          <button
            type="button"
            className="flex flex-row text-white bg-indigo-700 py-2 px-4 m-4 rounded"
            onClick={() => {
              setState([...state, getItems(1)]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add new task</span>
          </button>
        </div>
      </header>
      <p className="text-center text-indigo-900">**Click on item to edit</p>
      <div className="flex h-3/4 py-8 px-4 bg-indigo-100">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={
                    snapshot.isDraggingOver
                      ? `
                  bg-indigo-100`
                      : ``
                  }
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? "bg-red-100" : ""}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="flex justify-between">
                            <Field
                              state={state}
                              setState={setState}
                              item={item}
                              column={ind}
                            ></Field>
                            <div>
                              <button
                                type="button"
                                name="delete"
                                onClick={() => {
                                  const newState = [...state];
                                  newState[ind].splice(index, 1);
                                setState(
                                  newState.filter((group) => group.length)
                                );
                                }}
                                className="text-red-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
