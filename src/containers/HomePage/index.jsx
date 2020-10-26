import {
  Card,
  CardContent,
  Grid,
  GridList,
  GridListTile,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import CardList from '../../components/CardList';
import FormQuickAdd from '../../components/FormQuickAdd';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../../actions/card';
import * as listActions from '../../actions/list';

class HomePage extends React.Component {
  componentDidMount() {
    const { cardActionCreators, listActionCreators } = this.props;
    const { listenCardData } = cardActionCreators;
    const { listenListData } = listActionCreators;
    listenCardData();
    listenListData();
  }

  componentWillUnmount() {
    const { cardActionCreators, listActionCreators } = this.props;
    const { cancelListenCardData } = cardActionCreators;
    const { cancelListenListData } = listActionCreators;
    cancelListenCardData();
    cancelListenListData();
  }

  /** add list */
  handleAddList = ({ name, key }) => {
    const { listActionCreators } = this.props;
    const { createList, updateList } = listActionCreators;
    if (key) {
      updateList({ name, key });
    } else {
      createList({ name });
    }
  };

  /** delete list */
  handleDeleteList = (data) => {
    const { listActionCreators } = this.props;
    const { deleteList } = listActionCreators;
    deleteList(data);
  };

  /** add card or update card */
  handleAddCard = ({ key, name, cardKey }) => {
    const { cardActionCreators } = this.props;
    const { createCard, updateCard } = cardActionCreators;
    if (cardKey) {
      updateCard({ listKey: key, name, key: cardKey });
    } else {
      createCard({ listKey: key, name });
    }
  };

  /** delete card */
  handleDeleteCard = (data) => {
    const { key } = data;
    if (key) {
      const { cardActionCreators } = this.props;
      const { deleteCard } = cardActionCreators;
      deleteCard({ key });
    }
  };

  render() {
    const { classes, cards: dataCard, lists: dataList } = this.props;
    return (
      <div className={classes.root}>
        <Grid container></Grid>
        <GridList cols={4.5} className={classes.gridListContainer}>
          {dataList.map((list) => {
            const cards = dataCard.filter((card) => card.listKey === list.key);
            return (
              <GridListTile key={list.key} className={classes.gridList}>
                <CardList
                  key={list.key}
                  onSubmitCard={this.handleAddCard}
                  onSubmitList={this.handleAddList}
                  onDeleteCard={this.handleDeleteCard}
                  onDeleteList={this.handleDeleteList}
                  cards={cards}
                  list={list}
                />
              </GridListTile>
            );
          })}
          <GridListTile className={classes.gridList}>
            <Card className={classes.cardQuickAdd}>
              <CardContent className={classes.cardQuickAddContent}>
                <FormQuickAdd
                  onSubmitForm={this.handleAddList}
                  placeholder={'Add a list'}
                  isShowAddButton={true}
                />
              </CardContent>
            </Card>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object,
  cardActionCreators: PropTypes.shape({
    fetchListCard: PropTypes.func,
    createCard: PropTypes.func,
    listenCardData: PropTypes.func,
    cancelListenCardData: PropTypes.func,
    deleteCard: PropTypes.func,
    updateCard: PropTypes.func,
  }),
  listActionCreators: PropTypes.shape({
    fetchList: PropTypes.func,
    createList: PropTypes.func,
    listenListData: PropTypes.func,
    cancelListenListData: PropTypes.func,
    deleteList: PropTypes.func,
    updateList: PropTypes.func,
  }),
  cards: PropTypes.array,
  lists: PropTypes.array,
};

const mapStateToProps = (state) => ({
  cards: state.card.cards,
  lists: state.list.lists,
});

const mapDispatchToProps = (dispatch) => ({
  cardActionCreators: bindActionCreators(cardActions, dispatch),
  listActionCreators: bindActionCreators(listActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(withStyles(styles)(HomePage));
