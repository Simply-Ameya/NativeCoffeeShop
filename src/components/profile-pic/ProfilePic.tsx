import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './ProfilePic.styles';

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        style={styles.Image}
        source={require('../../assets/app_images/avatar.png')}
      />
    </View>
  );
};

export default ProfilePic;
