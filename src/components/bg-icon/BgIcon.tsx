import {View} from 'react-native';
import React from 'react';

import {bgIconProps} from '../../entities/bgIcon.interface';
import {styles} from './BgIcon.styles';
import CustomIcon from '../CustomIcon';

const BgIcon: React.FC<bgIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.IconBg, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BgIcon;
