import React, { FC, useCallback, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  getDoingList,
  getDoneList,
} from "./redux/selectors/getTodoList";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const todoList = useSelector(getTodoList);
  const doingList = useSelector(getDoingList);
  const doneList = useSelector(getDoneList);

  // console.log("TodoList:", todoList);
  // console.log("DoingLst:", doingList);

  const handleOnClickAdd = useCallback(() => {
    dispatch(add(title, description));
    setTitle("");
    setDesc("");
    handleClose();
  }, [dispatch, title, description, setTitle, setDesc]);

  const handleOnClickUpdate = useCallback(
    (id) => {
      dispatch(update(id));
    },
    [dispatch]
  );

  const handleOnTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(event.target.value);
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const handleOnDescChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDesc(event.target.value);
    },
    [setDesc]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            {`${index + 1} : ${todo.title}`}
            <br></br>
            {`${todo.description}`}
            <Button
              variant="outlined"
              onClick={() => handleOnClickUpdate(todo.id)}
            >
              Update
            </Button>
          </span>
        ))}
      </div>
      <div className={classes.root}>
        Doing
        {doingList.map((todo, index) => (
          <span key={index.toString()}>
            {`${index + 1} : ${todo.title}`}
            <br></br>
            {`${todo.description}`}
            <Button
              variant="outlined"
              onClick={() => handleOnClickUpdate(todo.id)}
            >
              Update
            </Button>
          </span>
        ))}
      </div>
      <div className={classes.root}>
        Done
        {doneList.map((todo, index) => (
          <span key={index.toString()}>
            {`${index + 1} : ${todo.title}`}
            <br></br>
            {`${todo.description}`}
          </span>
        ))}
      </div>

      <div className={classes.button}>
        <Button variant="contained" onClick={handleClickOpen}>
          Add
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Adding todolist</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              value={title}
              onChange={handleOnTitleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              value={description}
              onChange={handleOnDescChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnClickAdd} color="primary">
              OK
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default App;
