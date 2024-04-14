function RenderPlainForm({ model }) {
  return (
    <div className="rounded-lg bg-n-2 space-y-6 mb-1 p-4">
      <h1 className="text-xl  text-gray-800 font-semibold mb-1">Only for Preview purpose</h1>
      {model.fields.map((field, index) =>
        field.type === "short-text" || field.type === "number" ? (
          <div key={index} className="flex flex-col">
            <label className="mb-1 text-gray-800">
              {field.title}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              className="w-full border border-black rounded px-4 py-2 text-gray-800"
            />
          </div>
        ) : field.type === "long-text" ? (
          <div key={index} className="flex flex-col">
            <label className="mb-1 text-gray-800">
              {field.title}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea className="w-full border border-black rounded px-4 py-2 text-gray-800"></textarea>
          </div>
        ) : field.type === "file" ? (
          <div key={index} className="flex flex-col">
            <label className="mb-1 text-gray-800">
              {field.title}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              className="border border-black rounded px-4 py-2 text-gray-800"
            />
          </div>
        ) : field.type === "multioption-singleanswer" ||
          field.type === "multioption-multianswer" ? (
          <div key={index} className="flex flex-col">
            <label className="mb-1 text-gray-800">
              {field.title}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.options.map((option, idx) => (
              <div className="flex items-center" key={idx}>
                <input
                  type={
                    field.type === "multioption-singleanswer"
                      ? "radio"
                      : "checkbox"
                  }
                  className="mr-1"
                  name={field.title.replace(" ", "")}
                />
                <label className="text-gray-800">{option}</label>
              </div>
            ))}
          </div>
        ) : (
          <p key={index}>Unknown field type.</p>
        )
      )}
      <button className="mt-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  );
}

export default RenderPlainForm;
