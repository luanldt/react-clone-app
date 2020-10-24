import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormQuickAdd from '../FormQuickAdd/index';
import CardTask from '../CardTask';
import styles from './styles';

class CardList extends Component {
  state = {
    cardName: '',
  };

  renderCardList = () => {
    const { cards } = this.props;
    let xhtml = null;
    if (cards) {
      xhtml = cards.map((card) => (
        <CardTask
          onSubmitForm={this.handleSubmitCard}
          card={card}
          key={card.key}
        />
      ));
    }
    return xhtml;
  };

  handleListNameChange = (e) => {
    const value = e.target.value;
    this.setState({
      listName: value,
    });
  };

  handleCardNameChange = (e) => {
    const value = e.target.value;
    this.setState({
      cardName: value,
    });
  };

  handleSubmitCard = ({ name, cardKey }) => {
    const { onSubmitCard, list } = this.props;
    onSubmitCard({ key: list.key, name, cardKey });
  };

  render() {
    const { classes, list } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          title={list.name}
          action={
            <IconButton onClick={() => this.handleDeleteList(list.key)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        <PerfectScrollbar>
          <CardContent className={classes.content}>
            {this.renderCardList()}
          </CardContent>
        </PerfectScrollbar>
        <CardContent className={classes.contentQuickCard}>
          <FormQuickAdd
            placeholder={'Add a card'}
            onSubmitForm={this.handleSubmitCard}
            isShowAddButton={true}
          />
        </CardContent>
      </Card>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object,
  onSubmitCard: PropTypes.func,
  cards: PropTypes.array,
  list: PropTypes.object,
};

export default withStyles(styles)(CardList);
