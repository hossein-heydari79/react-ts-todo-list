import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import "./App.scss";

function App() {
  interface data {
    text: string;
    editMode: boolean;
  }

  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<data[]>([]);
  const [btnValue, setBtnValue] = useState<string>("ADD");

  useEffect(() => {
    toast.success("Welcome To React-Typescripts!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  function set() {
    let index = data.findIndex((item) => item.editMode === true);

    if (value == "" || value == " ") {
      toast.error("Fill in the field!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (data.length == 0 || index == -1) {
        setData([
          ...data,
          {
            text: value,
            editMode: false,
          },
        ]);
        setValue("");

        toast.success("Successfully added!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        let newData = [...data];
        newData[index].text = value;
        newData[index].editMode = false;

        toast.success("Edited successfully!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setData(newData);

        setBtnValue("ADD");
        setValue("");
      }
    }
  }

  function chandeEditMode(index: number) {
    let newData = [...data];
    newData[index].editMode = true;
    setValue(newData[index].text);
    setBtnValue("EDIT");

    setData(newData);
  }

  function remove(index: number) {
    let newData = [...data];

    newData.splice(index, 1);

    toast.warn("Successfully deleted!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setData(newData);
  }

  function get(e: React.ChangeEvent) {
    let el = e.target as HTMLInputElement;
    setValue(el.value);
  }

  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div className="main d-flex flex-column align-items-center">
        <h1 className="mt-4">ToDo App</h1>

        <div className="form d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="ADD YOUR TASK ..."
            className="input"
            onChange={get}
            value={value}
          />
          <button className="btn" onClick={set}>
            {btnValue}
          </button>
          <ToastContainer style={{ fontSize: "1.5rem" }} />
        </div>

        <div className="div-card">
          {data.map((item, index) => (
            <div
              key={index}
              className="cards d-flex justify-content-between align-items-center"
            >
              <div>
                <p className="title">{item.text}</p>
              </div>
              <div className="icons">
                <MdDelete
                  style={{ fontSize: "1.8rem", cursor: "pointer" }}
                  onClick={() => remove(index)}
                />
                <FaEdit
                  style={{ fontSize: "1.8rem", cursor: "pointer" }}
                  onClick={() => chandeEditMode(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
