import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faCircle} from '@fortawesome/free-regular-svg-icons/faCircle';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons/faCircleXmark';
import {Circle} from 'react-native-svg';

const getCellStyle = index => {
  const baseStyle = {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: 'gray',
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
  const gameBoard = Array.from({length: 9}, (_, index) => index + 1);
  return (
    <View style={styles.container}>
      <View>
        <Text>This is a Header Text</Text>
      </View>
      <View style={styles.gameContainer}>
        <Text>Players turn</Text>
        <View style={styles.boardContainer}>
          {gameBoard.map((value, index) => (
            <BoardIcon key={value} index={index} />
          ))}
        </View>
        <Button title="Reset Game" />
      </View>
    </View>
  );
};

function BoardIcon({index}) {
  return (
    <View style={getCellStyle(index)}>
      <FontAwesomeIcon icon={faPencil} size={35} style={styleIcon.pencil} />
      <FontAwesomeIcon icon={faCircle} size={40} style={styleIcon.circle} />
      <FontAwesomeIcon
        icon={faCircleXmark}
        size={40}
        style={styleIcon.circleXMark}
      />
    </View>
  );
}

export default TicTocToe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183153',
  },
  gameContainer: {
    borderWidth: 5,
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
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
