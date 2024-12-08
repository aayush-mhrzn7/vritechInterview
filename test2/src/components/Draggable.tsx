import { useDraggable } from "@dnd-kit/core";
import { taskFormat } from "../App";

import { GoGrabber } from "react-icons/go";
import { BiTrash } from "react-icons/bi";
type DraggableTypes = {
  tasks: taskFormat;
  taskId: number;
  handleDelete: (itemId: number) => void;
};

function Draggable({ taskId, handleDelete, tasks }: DraggableTypes) {
  const { transform, listeners, setNodeRef } = useDraggable({
    id: taskId,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="py-1 shadow-xl flex items-center justify-between gap-4 my-5 p-4 rounded-md bg-white"
    >
      <div {...listeners} className="cursor-move p-2  rounded-md">
        <GoGrabber className="text-4xl" />
      </div>
      <div className={`${tasks.zone == "completed" ? "line-through" : ``}`}>
        {tasks.task}
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation(); // Prevent drag listeners
          handleDelete(taskId);
        }}
        className="font-semibold text-white p-1 rounded-md bg-red-500 hover:bg-red-800"
      >
        <BiTrash className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Draggable;
