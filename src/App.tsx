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
    button: {
      paddingTop: "16px",
      marginTop: theme.spacing(15),
      marginLeft: "70%",
    },
    updateButton: {
      marginLeft: theme.spacing(2),
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
  const [isDisabled, setDisabled] = useState(true);
  const todoList = useSelector(getTodoList);
  const doingList = useSelector(getDoingList);
  const doneList = useSelector(getDoneList);

  // console.log("TodoList:", todoList);
  // console.log("DoingLst:", doingList);

  const handleOnClickAdd = useCallback(() => {
    dispatch(add(title, description));
    setTitle("");
    setDesc("");
    setDisabled(true);
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
      event.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
    },
    [setTitle, setDisabled]
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
    <div>
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
            <span key={index.toString()} style={{ color: "#0000CD" }}>
              {`${index + 1} : ${todo.title}`}

              <Button
                size="small"
                variant="contained"
                onClick={() => handleOnClickUpdate(todo.id)}
                className={classes.updateButton}
              >
                Update
              </Button>
              <p>{`${todo.description}`}</p>
            </span>
          ))}
        </div>
        <div className={classes.root}>
          Doing
          {doingList.map((todo, index) => (
            <span key={index.toString()} style={{ color: "#FFCC00 " }}>
              {`${index + 1} : ${todo.title}`}
              <Button
                size="small"
                variant="contained"
                onClick={() => handleOnClickUpdate(todo.id)}
                className={classes.updateButton}
              >
                Update
              </Button>
              {`${todo.description}`}
            </span>
          ))}
        </div>
        <div className={classes.root}>
          Done
          {doneList.map((todo, index) => (
            <span key={index.toString()} style={{ color: "#32CD32" }}>
              {`${index + 1} : ${todo.title}`}
              <br></br>
              {`${todo.description}`}
            </span>
          ))}
        </div>
      </div>
      <div className={classes.button}>
        <Button variant="contained" onClick={handleClickOpen} color="primary">
          Add
        </Button>
      </div>
      <div>
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
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              value={description}
              variant="outlined"
              onChange={handleOnDescChange}
              rows={4}
              multiline
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isDisabled}
              onClick={handleOnClickAdd}
              color="primary"
            >
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
