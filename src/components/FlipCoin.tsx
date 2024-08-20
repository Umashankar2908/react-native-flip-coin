import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface FlipCoinTeamProps {
  label: string;
  value: string;
}

interface FlipCoinProps {
  teamOptions: FlipCoinTeamProps[];
  onTossComplete?: (winner: FlipCoinTeamProps) => void;
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

export const FlipCoin = forwardRef<FlipCoinRef, FlipCoinProps>(
  (
    {
      teamOptions,
      onTossComplete,
      animationDuration = 400,
      flipCount = 5,
      customHeads,
      customTails,
      containerStyle = {},
      coinStyle = {},
      disableOnPressCoin = false,
      headsTextStyle = {},
      tailsTextStyle = {},
    },
    ref,
  ) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [side, setSide] = useState<string | undefined>(teamOptions[0].label);
    const timeout = useRef<any>();

    const flipCoinHandler = useCallback(() => {
      // Reset the animation value
      animatedValue.setValue(0);
      setSide(undefined);

      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        const isheadsOpacity = Math.random() < 0.5;
        const winner = isheadsOpacity ? teamOptions[0] : teamOptions[1];
        setSide(winner.label);
        onTossComplete?.(winner);
      }, animationDuration * flipCount);

      // Start the animation
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear, // Use linear easing for consistent speed
          useNativeDriver: true,
        }),
        {iterations: flipCount},
      ).start();
    }, [
      animatedValue,
      animationDuration,
      onTossComplete,
      flipCount,
      teamOptions,
    ]);

    // Interpolate the animation value to rotate the coin
    const rotateY = animatedValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'],
    });

    const headsOpacity = animatedValue.interpolate({
      inputRange: [0, 0.25, 0.3, 0.5, 0.71, 0.75, 1],
      outputRange: [1, 1, 0, 0, 0, 1, 1],
    });

    const tailsOpacity = animatedValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.71, 0.75, 1],
      outputRange: [0, 0, 1, 0, 0, 0],
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          flipCoin: flipCoinHandler,
        };
      },
      [flipCoinHandler],
    );

    useEffect(() => {
      return () => clearTimeout(timeout.current);
    }, []);

    return (
      <View style={{...styles.container, ...containerStyle}}>
        <Animated.View style={{transform: [{rotateY}]}}>
          <Pressable
            style={{...styles.coin, ...coinStyle}}
            onPress={() => {
              if (!disableOnPressCoin) {
                flipCoinHandler();
              }
            }}>
            <Animated.View style={{opacity: headsOpacity}}>
              {customHeads ?? (
                <Text style={{...styles.headsTextStyle, ...headsTextStyle}}>
                  {side ?? teamOptions[0].label}
                </Text>
              )}
            </Animated.View>
            <Animated.View style={{opacity: tailsOpacity}}>
              {customTails ?? (
                <Text style={{...styles.tailTextStyle, ...tailsTextStyle}}>
                  {teamOptions[1].label}
                </Text>
              )}
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coin: {
    height: 200,
    width: 200,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headsTextStyle: {fontSize: 25, fontWeight: 'bold'},
  tailTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    transform: [{rotateY: '180deg'}],
    marginTop: -30,
  },
});
