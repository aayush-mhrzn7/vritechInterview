import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";
type droppable = {
  zoneId: string;
  children: ReactNode;
};
function Droppable({ zoneId, children }: droppable) {
  const { isOver, setNodeRef } = useDroppable({ id: zoneId });
  const styles = isOver ? "bg-green-500" : "";
  //isOver holds a boolean data which shows in response to the draggable element being over the droppable Element

  return (
    <div
      ref={setNodeRef}
      onChange={(e) => e.stopPropagation()}
      className={`${styles} w-[500px] rounded-md shadow-lg bg-blue-500 p-4`}
    >
      <span className="block capitalize">
        <span className="block font-semibold text-white"> {zoneId}</span>
        {children}
      </span>
    </div>
  );
}

export default Droppable;
