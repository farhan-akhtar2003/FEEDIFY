// VERYY IMPORTANT 
export const createFillableModel = (model) => {
  let fillableModel = [];
  let fields = model.fields;
  for (let field of fields) {
    let fieldModel = {
      ...field,
      value:
        field.type === "multioption-singleanswer" ||
        field.type === "multioption-multianswer"
          ? []
          : "",
    };
    fillableModel.push(fieldModel);
  }
  return fillableModel;
};

export const createSubmitableModel = (fields) => {
  let submitableModel = [];
  for (let field of fields) {
    // Change to for...of loop
    if (!field.value || field.value.length < 1) continue;

    let fieldModel = {
      title: field.title,
      value: field.value,
      type: field.type,
    };
    submitableModel.push(fieldModel);
  }
  return submitableModel;
};


export const hasError = (fields) => {
  for (let field of fields) {
    // Skip non-required fields with empty values
    if (!field.required && (!field.value || field.value.length === 0)) {
      continue;
    }

    // Check if field is required and value is empty
    if (field.required && (!field.value || field.value.length === 0)) {
      return ` #  ' ${field.title} ' is a compulsory question .....`;
    }
  }
  return false;
};


//FEEDIFY>FRONTEND>SRC>UTILS>INDEX.JS
export const updateObjState = (setter, model, prop, val) => {
  let _model = Object.assign({}, model);
  _model[prop] = val;
  setter(_model);
};

export const updateArrOfObjState = (setter, model, index, prop, val) => {
  let _model = [...model];
  _model[index] = Object.assign({}, _model[index], { [prop]: val });
  setter(_model);
};

//toggles an item in array
export const arrayToggle = (arr, item) => {
  let idx = arr.indexOf(item);
  if (idx > -1) {
    arr.splice(idx, 1);
  } else {
    arr.push(item);
  }
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getDateFromMillis = (milliseconds) => {
  let date = new Date(milliseconds);
  return date.toLocaleString();
};

export const expired = (createDateMillis, hours) => {
  if (!hours) return false;
  let currentDateMillis = +new Date();
  let hoursMillis = parseInt(hours) * 60 * 60 * 1000;
  return currentDateMillis - createDateMillis < hoursMillis;
};
