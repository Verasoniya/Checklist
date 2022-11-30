import React from "react";

function Button({ Label, OnClick, Id }) {
  return (
    <button id={Id} onClick={OnClick} className="py-1 px-4 rounded-sm text-sm bg-[#4285F4] hover:bg-[#FDFDFD] text-[#FDFDFD] hover:text-[#4285F4] hover:border hover:border-[#6E85B7]">
      {Label}
    </button>
  );
}

export default Button;
