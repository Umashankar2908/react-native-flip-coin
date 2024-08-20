import React, {useRef} from 'react';
import {FlipCoin} from './src/components/FlipCoin';
import {FlipCoinRef} from './src/utils/interfaces';

function App(): React.JSX.Element {
  const teams = [
    {label: 'India', value: 'india'},
    {label: 'Pakistan', value: 'pak'},
  ];

  const ref = useRef<FlipCoinRef>(null);

  return (
    <FlipCoin
      options={teams}
      onTossComplete={winner => console.log({winner})}
      ref={ref}
      containerStyle={{marginTop: 200}}
    />
  );
}

export default App;
