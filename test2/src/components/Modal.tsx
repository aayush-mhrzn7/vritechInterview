import { useState } from "react";
import { taskFormat } from "../App";
type modalTypes = {
  toggleModal: () => void;
  items: taskFormat[];
};
const Modal = ({ toggleModal, items }: modalTypes) => {
  console.log(items);
  const [searchItem, setSearchItem] = useState("");
  return (
    <div>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[400px] max-sm:w-[300px] p-4 rounded">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium text-blue-500">
              Search And Filter
            </h2>
            <button
              onClick={toggleModal}
              className="bg-red-500 rounded-md px-4 py-1 text-white"
            >
              Close
            </button>
          </div>

          <input
            className="p-3 w-full border-2 my-3 rounded-md"
            type="text"
            placeholder="Search & filter"
            onChange={(e) => setSearchItem(e.target.value)}
          />

          {items
            .filter((item) =>
              item.task.toLowerCase().includes(searchItem.toLowerCase())
            )
            .map((item) => (
              <span className=" flex items-center my-2 justify-between gap-4">
                {item.task} is in
                <span className="block font-semibold capitalize text-blue-500">
                  {item.zone}
                </span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
