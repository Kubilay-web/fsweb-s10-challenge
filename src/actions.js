// actions.js
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        const extractedData = res.data.json;
        dispatch(notEkle(extractedData));
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  axios
    .delete(`https://httpbin.org/anything`,{data:id})
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        const extractedData = res.data.data;
        dispatch(notSil(extractedData));
      }
    })
    .catch((error) => console.log(error));
};
