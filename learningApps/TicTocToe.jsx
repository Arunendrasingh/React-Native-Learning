import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faCircle} from '@fortawesome/free-regular-svg-icons/faCircle';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons/faCircleXmark';

/*
Total player is 2:
so selected state will be null, 1 and 2.
when selected is null then display pencil, else display circle else display circle with x-mark.
*/

const getCellStyle = index => {
  const baseStyle = {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const borderStyle = {
    borderTopWidth: index < 3 ? 0 : 1,
    borderLeftWidth: index % 3 === 0 ? 0 : 1,
    borderRightWidth: index % 3 === 2 ? 0 : 1,
    borderBottomWidth: index > 5 ? 0 : 1,
  };

  return {...baseStyle, ...borderStyle};
};

const TicTocToe = () => {
  const initialBoard = () =>
    Array.from({length: 9}, (_, index) => {
      return {selected: null, selectedByPlayer: '', position: index + 1};
    });
  const players = ['Tom', 'Jerry'];
  // We assume true means player 1 and true means player 2

  const [board, setBoard] = useState(() => initialBoard());

  const [playerTurn, setPlayerTurn] = useState(players[0]);

  const setSelectedPlayOnBoard = (selected, currentPlayer, selectedIndex) => {
    // New board
    let newBoard = board.map((item, index) => {
      if (
        selected === null &&
        currentPlayer === players[0] &&
        selectedIndex === index
      ) {
        item.selected = 0;
        item.selectedByPlayer = currentPlayer;
      } else if (selected === null && selectedIndex === index) {
        item.selected = 1;
        item.selectedByPlayer = currentPlayer;
      }
      return item;
    });
    console.log(newBoard);
    if (currentPlayer === players[0]) {
      setPlayerTurn(players[1]);
    } else {
      setPlayerTurn(players[0]);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>This is a Header Text</Text>
      </View>
      <View style={styles.gameContainer}>
        <Text style={styles.text}>Players turn</Text>
        <View style={styles.boardContainer}>
          {board.map(({selected, position}, index) => (
            <BoardIcon
              key={position}
              index={index}
              selected={selected}
              setSelected={setSelectedPlayOnBoard}
              playerTurn={playerTurn}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.buttonText}>Reset the Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function BoardIcon({index, selected, setSelected, playerTurn}) {
  const iconToggle = () => {
    console.log('Icons is selected at index: ', index, playerTurn);
    setSelected(selected, playerTurn, index);
  };
  return (
    <View style={getCellStyle(index)}>
      <Pressable onPress={iconToggle}>
        {selected === null ? (
          <FontAwesomeIcon icon={faPencil} size={35} style={styleIcon.pencil} />
        ) : selected === 0 ? (
          <FontAwesomeIcon
            icon={faCircle}
            size={40}
            style={styleIcon.circleXMark}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleXmark}
            size={40}
            style={styleIcon.circle}
          />
        )}
      </Pressable>
    </View>
  );
}

export default TicTocToe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183153',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  gameContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    aspectRatio: 1,
    borderColor: 'black',
    alignSelf: 'center',
  },
  boardItem: {
    width: '33.33%',
    height: '33.33%',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6F61',
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const styleIcon = StyleSheet.create({
  pencil: {
    color: '#FFD43B',
  },
  circle: {
    color: '#63E6BE',
  },
  circleXMark: {color: '#B197FC'},
});
