# FlipCoin Component

`react-native-flip-coin` is a React Native component that simulates a coin flip with customizable options. This component allows you to visually flip a coin to decide between two options, with full control over the appearance and behavior.

## Installation

To install the package, use npm or yarn:

```bash
npm install react-native-flip-coin

## Props


| Prop                | Type                             | Default  | Description                                                                                       |
|---------------------|----------------------------------|----------|---------------------------------------------------------------------------------------------------|
| `teamOptions`       | `FlipCoinTeamProps[]`             | Required | An array of two options for the coin flip, each with a `label` and `value`.                      |
| `onTossComplete`    | `(winner: FlipCoinTeamProps) => void` | `undefined` | Callback function triggered when the coin flip is complete, returning the winning option.        |
| `animationDuration` | `number`                         | `400`    | Duration of each flip animation in milliseconds.                                                  |
| `flipCount`         | `number`                         | `5`      | Number of flips the coin performs during the animation.                                           |
| `customHeads`       | `ReactNode`                      | `undefined` | Custom component for the heads side of the coin.                                                  |
| `customTails`       | `ReactNode`                      | `undefined` | Custom component for the tails side of the coin.                                                  |
| `containerStyle`    | `ViewStyle`                      | `{}`     | Style for the container wrapping the coin.                                                        |
| `coinStyle`         | `ViewStyle`                      | `{}`     | Style for the coin itself.                                                                        |
| `disableOnPressCoin`| `boolean`                        | `false`  | If `true`, disables the coin flip when the coin is pressed.                                       |
| `headsTextStyle`    | `ViewStyle`                      | `{}`     | Style for the text on the heads side.                                                             |
| `tailsTextStyle`    | `ViewStyle`                      | `{}`     | Style for the text on the tails side.                                                             |

