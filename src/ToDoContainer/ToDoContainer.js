import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { todoList, lastIndex, sortedTodoList } from '../store';

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
  const setList = useSetRecoilState(todoList);
  const sortedList = useRecoilValue(sortedTodoList);

  const renderListItems = () => {
    if (!sortedList || sortedList.length === 0) {
      return (
        <ListItem key={0}>
          <ListItemText primary="No item found" />
        </ListItem>
      );
    }

    return sortedList.map(({ key, name }) => <ListItem key={key}>{name}</ListItem>);
  };

  const handleAddItem = () => {
    setList((oldList) => [
      ...oldList,
      { checked: false, key: index, name: inputText },
    ]);
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
          ToDo List
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
            <IconButton
              className={classes.iconButton}
              aria-label="add"
              onClick={handleAddItem}
            >
              <Add />
            </IconButton>
          </Paper>
          <List dense>{renderListItems()}</List>
        </Paper>
      </StyledPageContainer>
    </Container>
  );
};

export default ToDoContainer;
