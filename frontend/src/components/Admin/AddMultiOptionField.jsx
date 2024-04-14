import { useState, createRef } from "react";

function AddMultiOptionField({ inputType, add, close }) {
  const [err, setErr] = useState("");
  const [opterr, setOpterr] = useState("");

  const [title, setTitle] = useState("");
  const [required, setRequired] = useState(false);
  const inputRef = createRef();
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");

  const addField = () => {
    if (!title.trim()) return setErr("Title is required");
    if (title.trim().length < 4)
      return setErr("Title should be atleast 4 characters long");
    if (options.length < 1) return setErr("Atleast one option is required");
    add({
      title,
      required,
      options,
      type: inputType,
    });
    close();
  };

  const addOption = () => {
    if (!option.trim()) return setOpterr("Option is required");
    let _opts = [...options];
    _opts.push(option);
    setOption("");
    setOptions(_opts);
    inputRef.current.value = "";
    setOpterr("");
  };

  return (
    <div>
      <div className="input text-gray-800">
        <label>Enter field title</label>
        <input
          type="text"
          placeholder={`Eg. Select your ${
            inputType === "multioption-multianswer" ? "skills" : "gender"
          }`}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {options.length > 0 && (
        <div className="mb-1 text-gray-800">
          <p className="b text-gray-800">Options</p>
          {options.map((opt, index) => (
            <div className="input inline mb-0" key={index}>
              <input
                type={
                  inputType === "multioption-singleanswer"
                    ? "radio"
                    : "checkbox"
                }
                className="mr-1"
                name="inputs"
              />
              <label>{opt}</label>
            </div>
          ))}
        </div>
      )}
      <div className="input container bg-n-2 p-1">
        <input
          type="text"
          className="mb-1 text-gray-800"
          placeholder="Enter a option"
          onChange={(e) => setOption(e.target.value)}
          ref={inputRef}
        />
        {opterr && <p className="err mb-1 text-small">{opterr}</p>}
        <button
          className="mt-1 hover:bg-[#00827f] bg-[#319177] text-white font-bold py-2 px-4 rounded"
          onClick={addOption}
        >
          Add Option
        </button>
      </div>
      <div className="input inline bg-slate-300 text-gray-800 pl-2">
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

export default AddMultiOptionField;
