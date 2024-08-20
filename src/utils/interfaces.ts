import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export interface OptionsProps {
  label: string;
  value: string;
}

export interface FlipCoinProps {
  options: OptionsProps[];
  onTossComplete?: (winner: OptionsProps) => void;
  animationDuration?: number;
  flipCount?: number;
  customHeads?: ReactNode;
  customTails?: ReactNode;
  containerStyle?: ViewStyle;
  coinStyle?: ViewStyle;
  disableOnPressCoin?: boolean;
  headsTextStyle?: ViewStyle;
  tailsTextStyle?: ViewStyle;
}

export interface FlipCoinRef {
  flipCoin: () => void;
}
