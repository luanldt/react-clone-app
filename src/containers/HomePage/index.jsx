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

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataCard: [],
      dataList: [],
      listName: '',
      cardName: '',
    };
  }

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

    const myCard = firebase.database().ref('cards/');
    myCard.on('value', (snapshot) => {
      const myCardFromDB = snapshot.val();
      if (!myCardFromDB) {
        console.log('card is null');
        return;
      }
      const cards = Object.keys(snapshot.val()).map((key) => ({
        key: key,
        name: myCardFromDB[key].name,
        listKey: myCardFromDB[key].listKey,
      }));
      this.setState({
        dataCard: cards,
      });
    });
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
    const { classes } = this.props;
    const { dataList, dataCard } = this.state;
    return (
      <div className={classes.root}>
        <Grid container></Grid>
        <GridList cols={4.5} className={classes.gridListContainer}>
          {dataList.map((list) => {
            const cards = dataCard.filter((card) => card.listKey === list.key);
            return (
              <GridListTile key={list.key} className={classes.gridList}>
                <CardList
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

HomePage.propTypes = {};

export default withStyles(styles)(HomePage);
