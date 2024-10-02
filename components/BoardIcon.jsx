import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faCircle} from '@fortawesome/free-regular-svg-icons/faCircle';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons/faCircleXmark';

export default function BoardIcon({index, selected, setSelected, playerTurn}) {
  const iconToggle = () => {
    console.log('Icons is selected at index: ', index, playerTurn);
    setSelected(selected, playerTurn, index);
  };

  const getIcon = () => {
    if (selected === null) {
      return (
        <FontAwesomeIcon icon={faPencil} size={35} style={styleIcon.pencil} />
      );
    } else if (selected === 0) {
      return (
        <FontAwesomeIcon
          icon={faCircle}
          size={40}
          style={styleIcon.circleXMark}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faCircleXmark}
          size={40}
          style={styleIcon.circle}
        />
      );
    }
  };
  return (
    <View style={getCellStyle(index)}>
      <Pressable onPress={iconToggle}>{getIcon()}</Pressable>
    </View>
  );
}

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

const styleIcon = StyleSheet.create({
  pencil: {
    color: '#FFD43B',
  },
  circle: {
    color: '#63E6BE',
  },
  circleXMark: {color: '#B197FC'},
});
