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

// notEkleAPI ve notSilAPI action'larını güncelleyin
export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        // Burada API'den dönen verileri kullanabilirsiniz
        const extractedData = res.data.extractedData;

        // Güncellenmiş notları eklemek için notEkle action'ını dispatch edin
        dispatch(notEkle(extractedData));

        // Eğer bir toast mesajı gösterecekseniz, burada uygun bir yöntemle gösterebilirsiniz.
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        const extractedData = res.data.extractedData;
        dispatch(notSil(extractedData));
      }
      toast.success("Not başarıyla silindi!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000, // 2 saniye sonra otomatik kapanacak
      });
    })
    .catch((error) => console.log(error));
};
