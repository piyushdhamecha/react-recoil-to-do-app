import React, { useState } from 'react';
import {
  useRecoilState, useRecoilValue, useSetRecoilState, useRecoilCallback,
} from 'recoil';

import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  todoList, lastIndex, sortedTodoList,
} from '../store';

import { StyledPageContainer } from './ToDoContainerStyled';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const ToDoContainer = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [index, setIndex] = useRecoilState(lastIndex);
  const setList = useSetRecoilState(todoList(index));
  const sortedList = useRecoilValue(sortedTodoList);
  console.log({ sortedList });

  const updateRecord = useRecoilCallback(({ set }, record) => {
    set(todoList(record.key), record);
  });

  const handleCheckboxClick = () => {
    updateRecord();
  };

  const renderListItems = () => {
    if (!sortedList || sortedList.length === 0) {
      return (
        <ListItem key={0}>
          <ListItemText primary="No item found" />
        </ListItem>
      );
    }

    return sortedList.map(({ checked, key, name }) => (
      <>
        <ListItem key={key}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': key }}
              onClick={() => handleCheckboxClick(key)}
            />
          </ListItemIcon>
          <ListItemText id={key} primary={name} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </>
    ));
  };

  const handleAddItem = () => {
    setList({
      checked: false, key: index, name: inputText, isDeleted: false,
    });
    setIndex(index + 1);
    setInputText('');
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <StyledPageContainer elevation={1} square>
        <Typography color="primary" variant="h5" gutterBottom>
          To do List
        </Typography>
        <Paper elevation={0}>
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Add an item"
              inputProps={{ 'aria-label': 'Add an item', width: '100%' }}
              value={inputText}
              onChange={handleInputChange}
            />
            <IconButton className={classes.iconButton} aria-label="add" onClick={handleAddItem}>
              <Add />
            </IconButton>
          </Paper>
          <List disablePadding>{renderListItems()}</List>
        </Paper>
      </StyledPageContainer>
    </Container>
  );
};

export default ToDoContainer;
