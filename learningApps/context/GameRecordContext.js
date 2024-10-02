import React, {createContext, useState} from 'react';

export const GameRecordContext = createContext();

// Create a provide with state gameRecords
export const GameRecordProvider = ({children}) => {
  const [gameRecords, setGameRecords] = useState([]);

  return (
    <GameRecordContext.Provider value={{gameRecords, setGameRecords}}>
      {children}
    </GameRecordContext.Provider>
  );
};
