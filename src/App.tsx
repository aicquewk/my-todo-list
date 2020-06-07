import React, { FC, useCallback, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getTodoList, getDoingList, getDoneList } from "./redux/selectors/getTodoList";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { add, update } from "./redux/actions/todoAction";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "32px",
    },
    form: {
      width: "70%",
      paddingTop: "16px",
      alignItems: "flex-end",
    },
    button: {
      paddingTop: "16px",
    },
  }),
  { name: "App" }
);

const App: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const todoList = useSelector(getTodoList);
  const doingList = useSelector(getDoingList);
  const doneList = useSelector(getDoneList);

  // console.log("TodoList:", todoList);
  // console.log("DoingLst:", doingList);

  const handleOnClickAdd = useCallback(() => {
    dispatch(add(value));
    setValue("");
  }, [dispatch, value, setValue]);

  const handleOnClickUpdate = useCallback((id) => {
    dispatch(update(id));
  }, [dispatch]);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(event.target.value);
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
      }}
    >
      <div className={classes.root}>
        Todo
        {todoList.map((todo, index) => (
          <span key={index.toString()}>
            {`${index + 1} : ${todo.taskName}`}
            <Button variant="outlined" onClick={() => handleOnClickUpdate(todo.taskId)} >
              Update
            </Button>
          </span>
        ))}
        <form className={classes.form}>
          <TextField
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            value={value}
            onChange={handleOnChange}
          />
        </form>
        <div className={classes.button}>
          <Button variant="outlined" onClick={handleOnClickAdd}>
            Add
          </Button>
        </div>
      </div>
      <div className={classes.root}>
        Doing
        {doingList.map((todo, index) => (
          <span key={index.toString()}>
            {`${index + 1} : ${todo.taskName}`}
            <Button variant="outlined" onClick={() => handleOnClickUpdate(todo.taskId)} >
              Update
            </Button>
          </span>
        ))}
      </div>
      <div className={classes.root}>
        Done
        {doneList.map((todo, index) => (
          <span key={index.toString()}>
            {`${index + 1} : ${todo.taskName}`}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
