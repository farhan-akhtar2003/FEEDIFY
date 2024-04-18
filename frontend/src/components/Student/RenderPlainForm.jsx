
function RenderPlainForm({ model }) {
  return (
    <div className="rounded-lg bg-gray-300 shadow-md p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Only for Preview purpose
      </h1>
      {model.fields.map((field, index) => (
        <div key={index} className="mb-1">
          <label className="block text-gray-700 font-bold mb-1">
            Q{index + 1}: {field.title}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === "short-text" || field.type === "number" ? (
            <input
              type={field.type}
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
            />
          ) : field.type === "long-text" ? (
            <textarea className="w-full border border-gray-300 rounded px-4 py-2 text-gray-800 h-24 resize-none focus:outline-none focus:border-blue-500"></textarea>
          ) : field.type === "file" ? (
            <input
              type="file"
              className="border border-gray-300 rounded px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
            />
          ) : field.type === "multioption-singleanswer" ||
            field.type === "multioption-multianswer" ? (
            <div>
              {field.options.map((option, idx) => (
                <div className="flex items-center" key={idx}>
                  <input
                    type={
                      field.type === "multioption-singleanswer"
                        ? "radio"
                        : "checkbox"
                    }
                    className="mr-2"
                    name={field.title.replace(" ", "")}
                  />
                  <label className="text-gray-700">{option}</label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </div>
  );
}

export default RenderPlainForm;
