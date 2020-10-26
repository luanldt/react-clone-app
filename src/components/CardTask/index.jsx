import {
  Card,
  CardContent,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormQuickAdd from '../FormQuickAdd';
import styles from './styles';

class CardTask extends Component {
  state = {
    taskName: '',
    isUpdate: false,
  };

  handleDeleteCard = (key) => {
    const { onDeleteCard } = this.props;
    if (onDeleteCard) {
      onDeleteCard({ key });
    }
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

CardTask.propTypes = {
  classes: PropTypes.object,
  card: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onDeleteCard: PropTypes.func,
};

export default withStyles(styles)(CardTask);
