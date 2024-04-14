import { useState } from "react";

function AddTextField({ inputType, add, close }) {
  const [err, setErr] = useState("");

  const [title, setTitle] = useState("");
  const [required, setRequired] = useState(false);

  const addField = () => {
    if (!title.trim()) return setErr("Title is required");
    if (title.trim().length < 3)
      return setErr("Title should be atleast 3 characters long");

    add({
      title,
      required,
      type: inputType,
    });
    close();
  };

  return (
    <div>
      <div className="input text-gray-800 ">
        <label>Enter field title</label>
        <input
          type="text"
          placeholder={`Eg. Enter your ${
            inputType === "short-text"
              ? "Username"
              : inputType === "long-text"
              ? "information"
              : "age"
          }`}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input bg-slate-300 inline pl-2 text-gray-800">
        <label>Required: </label>
        <input type="checkbox" onChange={() => setRequired(!required)} />
      </div>
      {err && <p className="err mb-1">{err}</p>}
      <button
        className="mt-1 hover:bg-[#00827f] bg-[#319177] text-white font-bold py-2 px-4 rounded"
        onClick={addField}
      >
        add field
      </button>
    </div>
  );
}

export default AddTextField;
