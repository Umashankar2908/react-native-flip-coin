import React, {useRef} from 'react';
import {FlipCoin} from './src/components/FlipCoin';
import {FlipCoinRef} from './src/utils/interfaces';

function App(): React.JSX.Element {
  const teams = [
    {label: 'CSK', value: '23131'},
    {label: 'RCB', value: '213131'},
  ];

  const ref = useRef<FlipCoinRef>(null);

  return (
    <FlipCoin
      options={teams}
      onTossComplete={winner => console.log({winner})}
      ref={ref}
    />
  );
}

export default App;
