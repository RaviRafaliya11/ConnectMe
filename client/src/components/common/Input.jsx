import React from "react";

function Input({
  name,
  state,
  setState,
  label = false,
  inputtype,
  isdisabled,
}) {
  return (
    <div className="flex gap-1 flex-col">
      {label && (
        <label htmlFor={name} className="text-blue-500 text-xl px-1">
          {name}
        </label>
      )}
      <div>
        <input
          type={inputtype ? inputtype : "text"}
          name="name"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={isdisabled}
          className="text-start bg-input-background focus:outline-none text-white h-10 w-full rounded-lg px-5"
        />
      </div>
    </div>
  );
}

export default Input;
