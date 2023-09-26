import "./App.css";
import { useState } from "react";

function App() {
  //making an  obj from input field
  const [form, setForm] = useState({});

  //once creating an object push to the array
  const [taskList, setTaskList] = useState([]);

  const totalHrs = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const badHrElm = document.getElementById("badHr");

  const ttlHrPerWeek = 24 * 7;

  //getting data from inputs
  const handleOnChange = (e) => {
    const { value, name } = e.target;

    //I want to have two properties in an object

    //getting value of property of 'names'
    // adding objects to state name form
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (totalHrs + +form.hr > ttlHrPerWeek) {
      return alert("Sorry boos not enough time ");
    }
    //I need to have more properties of an object so I create it here more
    const obj = {
      ...form,
      type: "entry",
      id: randomStr(),
    };

    //before pushing to the array, check total hrs

    setTaskList([...taskList, obj]);
  };

  const handleOnDelete = (id, task) => {
    if (window.confirm(`Are you sure you want to delete ${task}?`)) {
      const filteredArg = taskList.filter((item) => item.id !== id);

      setTaskList(filteredArg);
    }
  };

  const randomStr = () => {
    const charLength = 6;
    const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    let id = "";

    for (let i = 0; i < charLength; i++) {
      const randNum = Math.round(Math.random() * (str.length - 1));
      id += str[randNum];
    }

    return id;
  };

  const switchTask = (id, type) => {
    const arg = taskList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          //getting type being passed
          type,
        };
      }
      return item;
    });
    setTaskList(arg);
  };

  //two arrays
  const entry = taskList.filter((item) => item.type === "entry");

  const bad = taskList.filter((item) => item.type === "bad");

  return (
    <div class="wrapper">
      <div class="container">
        {/* <!-- top title  --> */}
        <div class="row g-2">
          <div class="col mt-5 text-center">
            <h1>Not to do list</h1>
          </div>
        </div>

        {/* <!-- form  --> */}
        <form
          onSubmit={handleOnSubmit}
          action=""
          class="mt-5 border p-5 rounded shadow-lg bg-transparent"
        >
          <div class="row g-2">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Coding.."
                aria-label="First name"
                name="task"
                required
                onChange={handleOnChange}
              />
            </div>
            <div class="col-md-3">
              <input
                type="number"
                class="form-control"
                placeholder="hr"
                name="hr"
                onChange={handleOnChange}
              />
            </div>
            <div class="col-md-3">
              <div class="d-grid">
                <button class="btn btn-primary">Add Task</button>
              </div>
            </div>
          </div>
        </form>

        {/* <!-- bottom area  --> */}
        <div class="row mt-5 pt-2">
          {/* <!-- 1. entry list --> */}
          <div class="col-md">
            <h3 class="text-center">Task Entry List</h3>
            <hr />
            <table class="table table-striped table-hover border opacity">
              <tbody id="entry">
                {entry.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.hr}hr</td>
                    <td class="text-end">
                      <button
                        onClick={() => handleOnDelete(item.id, item.task)}
                        class="btn btn-danger"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>

                      {/* changing type of task  to "bad" */}
                      <button
                        onClick={() => switchTask(item.id, "bad")}
                        class="btn btn-success"
                      >
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <!-- 2. bad list  --> */}
          <div class="col-md">
            <h3 class="text-center">Bad List</h3>
            <hr />
            <table class="table table-striped table-hover border opacity">
              <tbody id="bad">
                {bad.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.hr}</td>
                    <td class="text-end">
                      <button
                        onClick={() => switchTask(item.id, "entry")}
                        class="btn btn-warning"
                      >
                        <i class="fa-solid fa-arrow-left"></i>
                      </button>

                      <button
                        onClick={() => handleOnDelete(item.id, item.task)}
                        class="btn btn-danger"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div class="alert alert-info">
              You could have save ={" "}
              <span id="badHr">
                {bad.reduce((acc, item) => acc + +item.hr, 0)}
              </span>
              hr
            </div>
          </div>
        </div>

        {/* <!-- total time allocated --> */}
        <div class="alert alert-info">
          Total hrs per week allocated = <span id="totalHr">{totalHrs}</span>
          hr
        </div>
      </div>
    </div>
  );
}

export default App;
