/**
 * This bottomsheet shows header with loading icon left and close icon
 * App Instances ex: 'adding new contact'
 * Takes the following props:
 * 1. visible state for bottomsheet
 * 2. onClose function (runs on right 'x' and modal backdrop click)
 * 3. title text for bottomsheet header
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {PortSpacing, isIOS} from '@components/ComponentUtils';
import DynamicColors from '@components/DynamicColors';
import {
  FontSizeType,
  FontType,
  NumberlessText,
  getWeight,
} from '@components/NumberlessText';

import CloudOff from '@assets/icons/CloudOff.svg';
import WifiOff from '@assets/icons/WifiOff.svg';

import PrimaryButton from '../LongButtons/PrimaryButton';

import PrimaryBottomSheet from './PrimaryBottomSheet';

const LoadingBottomSheet = ({
  visible,
  title,
  onClose,
  onStopPress,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  onStopPress: () => Promise<void>;
}) => {
  const Colors = DynamicColors();

  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    setIsLoading(true);
    await onStopPress();
    setIsLoading(false);
    onClose();
  };
  return (
    <PrimaryBottomSheet
      showClose={true}
      showLoaderIconLeft={true}
      visible={visible}
      title={title}
      titleStyle={styles.title}
      onClose={onClose}>
      <View style={styles.mainWrapper}>
        <View style={styles.descriptionWrapper}>
          <NumberlessText
            style={{
              width: '100%',
              color: Colors.text.subtitle,
              marginBottom: PortSpacing.secondary.bottom,
            }}
            fontSizeType={FontSizeType.m}
            fontType={FontType.rg}>
            If this is taking longer than usual, it might be because:
          </NumberlessText>
          <View style={{flexDirection: 'row', gap: PortSpacing.tertiary.right}}>
            <WifiOff width={16} height={16} />
            <NumberlessText
              style={{...styles.subDescText, color: Colors.text.subtitle}}
              fontSizeType={FontSizeType.m}
              fontType={FontType.rg}>
              You or your contact are not connected to the internet.
            </NumberlessText>
          </View>
          <View style={{flexDirection: 'row', gap: PortSpacing.tertiary.right}}>
            <CloudOff width={16} height={16} />
            <NumberlessText
              style={{...styles.subDescText, color: Colors.text.subtitle}}
              fontSizeType={FontSizeType.m}
              fontType={FontType.rg}>
              Port servers are facing issues.
            </NumberlessText>
          </View>
        </View>
        <View style={{marginTop: PortSpacing.secondary.top}}>
          <PrimaryButton
            buttonText="Stop adding"
            primaryButtonColor="r"
            isLoading={isLoading}
            disabled={false}
            onClick={onClick}
          />
        </View>
      </View>
    </PrimaryBottomSheet>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'column',
    width: '100%',
    marginTop: PortSpacing.intermediate.top,
    ...(isIOS ? {marginBottom: PortSpacing.secondary.bottom} : 0),
  },
  title: {
    fontFamily: FontType.rg,
    fontSize: FontSizeType.l,
    fontWeight: getWeight(FontType.rg),
    marginLeft: PortSpacing.tertiary.left,
  },
  subDescText: {
    marginBottom: PortSpacing.tertiary.bottom,
    marginLeft: 4,
    flex: 1,
  },
  descriptionWrapper: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
});

export default LoadingBottomSheet;
