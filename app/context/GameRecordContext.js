import React, {createContext, useState, useMemo} from 'react';
import PropTypes from 'prop-types';

export const GameRecordContext = createContext();

// Create a provide with state gameRecords
export const GameRecordProvider = ({children}) => {
  const [gameRecords, setGameRecords] = useState([]);

  const value = useMemo(() => ({gameRecords, setGameRecords}), [gameRecords]);

  return (
    <GameRecordContext.Provider value={value}>
      {children}
    </GameRecordContext.Provider>
  );
};

GameRecordProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
