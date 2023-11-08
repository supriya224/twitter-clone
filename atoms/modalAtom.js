import { useState } from "react";
import { atom } from "recoil";
// const [modalState, setModalState] = useState(false);

export const modalState = atom({
  key: "modal-state",
  default: false,
});
export const postIdState = atom({
    key: "postIdState",
    default: false,
  });
  
