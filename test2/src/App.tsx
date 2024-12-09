//breaking down into simple steps:
//DONE: create a todo with the following Structure :{id: 1,task:"name",zone:"todo|completed|doing"}
//DONE: make todos be deletable
//DONE: create dropable Zones done
//DONE:create Draggables
//DONE: map the respective zone in the draggable to the zones of dropzone
//DONE create a ref for the todo task and create a input box to write todo default should always be todo and later the user  will cahnge
//FIXED:Event Bublbing
//DONE: MODAL Creation for search and filter
import { useEffect, useRef, useState } from "react";
import Droppable from "./components/Droppable";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./components/Draggable";
import { FiPlus } from "react-icons/fi";
import Modal from "./components/Modal";
export type taskFormat = {
  sn: number;
  task: string;
  zone: "todo" | "doing" | "completed";
};
const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const zones = ["todo", "doing", "completed"];
  const [tasks, setTasks] = useState<taskFormat[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = (itemSn: number) => {
    setTasks((prev) => prev.filter((item) => item.sn !== itemSn));
  };
  function handleDragEnd(event: any) {
    const { over } = event; //event is the actual draggableData over means kasko mathi( kun dropzone ko mathi)
    // console.log(event);
    setTasks((prev) =>
      prev.map((task) =>
        task.sn === event.active.id && over ? { ...task, zone: over.id } : task
      )
    );
  }
  const getTasksByZone = (zone: "todo" | "doing" | "completed") => {
    return tasks.filter((task) => task.zone === zone);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputRef.current && inputRef.current.value) {
      const newTask = inputRef.current.value;
      setTasks((prevTasks) => [
        ...prevTasks,
        { sn: prevTasks.length + 1, task: newTask, zone: "todo" },
      ]);
      inputRef.current.value = "";
    }
  };
  return (
    <div className="font-primary p-10">
      {isOpen ? <Modal toggleModal={toggleModal} items={tasks} /> : ""}
      <div className="flex justify-center gap-2 items-center mt-10 max-sm:flex-col">
        <input
          className="text-md border-2 p-2 outline-none px-10 max-sm:w-full"
          type="text"
          ref={inputRef}
          placeholder="what is your new Task"
        />
        <button
          className="p-2 bg-blue-500 text-white font-semibold px-5 max-sm:w-full"
          onClick={addTask}
        >
          Submit
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-7 justify-center items-start flex-wrap mt-6">
          {zones.map((zone) => (
            <Droppable zoneId={zone} key={zone}>
              {getTasksByZone(zone as "todo" | "doing" | "completed").map(
                (task) => (
                  <Draggable
                    key={task.sn}
                    handleDelete={handleDelete}
                    taskId={task.sn}
                    tasks={task}
                  />
                )
              )}
            </Droppable>
          ))}
        </div>
      </DndContext>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center text-4xl cursor-pointer text-white fixed bottom-10 right-10 h-20 w-20 bg-blue-500 rounded-full"
      >
        <FiPlus />
      </div>
    </div>
  );
};

export default App;
