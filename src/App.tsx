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
import Paper from "@material-ui/core/Paper";
import { add, update } from "./redux/actions/todoAction";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    status: {
      paddingLeft: "15px",
    },
    addButton: {
      paddingTop: "32px",
      paddingLeft: "94%",
    },
    updateButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      wordWrap: "break-word",
    },
    description: {
      paddingLeft: "16px",
      wordWrap: "break-word",
      whiteSpace: "pre-line",
    },
    paper: {
      minHeight: 300,
      width: "90%",
      maxWidth: 400,
      padding: 15,
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
    <div
      style={{
        padding: 32,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: 15,
        }}
      >
        <div className={classes.root}>
          <div className={classes.status}>
            <b>Todo</b>
          </div>
          <br />
          <Paper className={classes.paper}>
            {todoList.map((todo, index) => (
              <span
                className={classes.title}
                key={index.toString()}
                style={{ color: "#0000CD" }}
              >
                {`${index + 1}. ${todo.title}`}

                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleOnClickUpdate(todo.id)}
                  className={classes.updateButton}
                >
                  Update
                </Button>
                <p className={classes.description}>{`${todo.description}`}</p>
              </span>
            ))}
          </Paper>
        </div>
        <div className={classes.root}>
          <div className={classes.status}>
            <b>Doing</b>
          </div>
          <br />
          <Paper className={classes.paper}>
            {doingList.map((todo, index) => (
              <span
                className={classes.title}
                key={index.toString()}
                style={{ color: "#FFCC00 " }}
              >
                {`${index + 1}. ${todo.title}`}
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleOnClickUpdate(todo.id)}
                  className={classes.updateButton}
                >
                  Update
                </Button>
                <p className={classes.description}>{`${todo.description}`}</p>
              </span>
            ))}
          </Paper>
        </div>
        <div className={classes.root}>
          <div className={classes.status}>
            <b>Done</b>
          </div>
          <br />
          <Paper className={classes.paper}>
            {doneList.map((todo, index) => (
              <span
                className={classes.title}
                key={index.toString()}
                style={{ color: "#32CD32" }}
              >
                {`${index + 1}. ${todo.title}`}
                <p className={classes.description}>{`${todo.description}`}</p>
              </span>
            ))}
          </Paper>
        </div>
      </div>
      <div className={classes.addButton}>
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
