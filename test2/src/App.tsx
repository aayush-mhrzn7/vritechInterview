function App() {
  return (
    <div className="h-screen font-primary p-10">
      <input
        autoFocus
        type="text"
        placeholder="Enter a task."
        className="p-2 border rounded-md rounded-tr-none outline-none rounded-br-none"
      />
      <button className="p-2 px-10 rounded-md bg-blue-500 rounded-tl-none rounded-bl-none text-white font-semibold">
        Add
      </button>
    </div>
  );
}

export default App;
