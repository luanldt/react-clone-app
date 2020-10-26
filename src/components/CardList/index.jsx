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
    isUpdate: false,
  };

  renderCardList = () => {
    const { cards } = this.props;
    let xhtml = null;
    if (cards) {
      xhtml = cards.map((card) => (
        <CardTask
          onSubmitForm={this.handleSubmitCard}
          onDeleteCard={this.handleDeleteCard}
          card={card}
          key={card.key}
        />
      ));
    }
    return xhtml;
  };

  handleSubmitCard = ({ name, cardKey }) => {
    const { onSubmitCard, list } = this.props;
    onSubmitCard({ key: list.key, name, cardKey });
    this.setState({
      isUpdate: false,
    });
  };

  handleSubmitList = ({ name }) => {
    const { onSubmitList, list } = this.props;
    if (onSubmitList) {
      onSubmitList({ name, key: list.key });
    }
    this.setState({
      isUpdate: false,
    });
  };

  handleDeleteCard = (data) => {
    const { onDeleteCard } = this.props;
    if (onDeleteCard) {
      onDeleteCard(data);
    }
  };

  handleEdit = () => {
    this.setState({
      isUpdate: true,
    });
  };

  handleDeleteList = (data) => {
    const { onDeleteList } = this.props;
    if (onDeleteList) {
      onDeleteList(data);
    }
  };

  render() {
    const { classes, list } = this.props;
    const { isUpdate } = this.state;

    return (
      <Card className={classes.root}>
        {isUpdate ? (
          <CardContent className={classes.contentQuickCard}>
            <FormQuickAdd
              placeholder={'Add a list'}
              onSubmitForm={this.handleSubmitList}
              isShowAddButton={false}
              initialData={list.name}
            />
          </CardContent>
        ) : (
          <CardHeader
            onClick={this.handleEdit}
            className={classes.header}
            title={list.name}
            action={
              <IconButton
                onClick={() => this.handleDeleteList({ key: list.key })}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        )}
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
  onSubmitList: PropTypes.func,
  onDeleteCard: PropTypes.func,
  onDeleteList: PropTypes.func,
  cards: PropTypes.array,
  list: PropTypes.object,
};

export default withStyles(styles)(CardList);
