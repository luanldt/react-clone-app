import {
  Card,
  CardContent,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import firebase from '../../firebase';
import CloseIcon from '@material-ui/icons/Close';
import FormQuickAdd from '../FormQuickAdd';

class CardTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      isUpdate: false,
    };
  }

  handleDeleteCard = (key) => {
    firebase.database().ref(`cards/${key}`).remove();
  };

  handleEdit = () => {
    this.setState({ isUpdate: true });
  };

  onSubmitForm = ({ name }) => {
    const { onSubmitForm, card } = this.props;
    if (onSubmitForm) {
      onSubmitForm({ name, cardKey: card.key });
      this.setState({
        isUpdate: false,
      });
    }
  };

  render() {
    const { card, classes } = this.props;
    const { isUpdate } = this.state;

    return (
      <Card className={classes.root}>
        <CardContent className={classes.content} onClick={this.handleEdit}>
          {!isUpdate ? (
            <Typography>{card.name}</Typography>
          ) : (
            <FormQuickAdd
              onSubmitForm={this.onSubmitForm}
              initialData={card.name}
            />
          )}
          <IconButton
            size="small"
            onClick={() => this.handleDeleteCard(card.key)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(CardTask);
