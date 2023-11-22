import {Text, View} from 'react-native';
import React from 'react';

import {HeaderBarProps} from '../../entities/headerBarProps.interface';
import {styles} from './HeaderBar.styles';
import GradientBGIcon from '../gradient-bg-icon/GradientBGIcon';
import ProfilePic from '../profile-pic/ProfilePic';
import {COLORS, FONTSIZE} from '../../theme/theme';

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderComponent}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;
