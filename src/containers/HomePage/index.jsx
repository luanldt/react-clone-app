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
import firebase from '../../firebase';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../../actions/card';

class HomePage extends React.Component {
  state = {
    dataCard: [],
    dataList: [],
    listName: '',
    cardName: '',
  };

  componentDidMount() {
    const myList = firebase.database().ref('list/');
    myList.on('value', (snapshot) => {
      const myListFromDB = snapshot.val();
      if (!myListFromDB) {
        console.log('list is null');
        return;
      }
      const list = Object.keys(snapshot.val()).map((key) => ({
        key: key,
        name: myListFromDB[key].name,
      }));
      this.setState({
        dataList: list,
      });
    });
    const { cardActionCreators } = this.props;
    const { fetchListCard } = cardActionCreators;
    fetchListCard();
  }

  handleAddList = ({ name }) => {
    const newListKey = firebase.database().ref('list/').push().key;
    firebase
      .database()
      .ref('list/')
      .update({
        [newListKey]: {
          name,
        },
      });
  };

  handleAddCard = ({ key, name, cardKey }) => {
    let newCardKey;
    if (!cardKey) {
      newCardKey = firebase.database().ref('cards/').push().key;
    } else {
      newCardKey = cardKey;
    }
    firebase
      .database()
      .ref('cards/')
      .update({
        [newCardKey]: {
          listKey: key,
          name,
        },
      });
  };

  handleDeleteList = (key) => {
    const { dataCard } = this.state;
    const cardInList = dataCard.filter((card) => card.listKey === key);
    if (cardInList.length > 0) {
      cardInList.forEach((card) => {
        this.handleDeleteCard(card.key);
      });
    }
    firebase.database().ref(`list/${key}`).remove();
    if (this.state.dataList.length === 1) {
      this.setState({
        dataList: [],
      });
    }
  };

  render() {
    const { classes, cards: dataCard } = this.props;
    const { dataList } = this.state;
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
  }),
  cards: PropTypes.array,
};

const mapStateToProps = (state) => ({
  cards: state.card.cards,
});

const mapDispatchToProps = (dispatch, props) => ({
  cardActionCreators: bindActionCreators(cardActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(withStyles(styles)(HomePage));
