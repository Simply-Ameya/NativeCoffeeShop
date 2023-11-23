import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';

import {FlatListItemsCardProps} from '../../entities/flatListItemsCardProps.interface';

import {styles} from './FlatListItemsCard.styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import BgIcon from '../bg-icon/BgIcon';

const FlatListItemsCard: React.FC<FlatListItemsCardProps> = ({
  name,
  id,
  index,
  type,
  roasted,
  imagelink_square,
  special_ingredient,
  average_rating,
  prices,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={imagelink_square}
        style={styles.cardImageBackground}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>

      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubtitle}>{special_ingredient}</Text>

      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $ <Text style={styles.CardPrice}>{prices.price}</Text>
        </Text>

        <TouchableOpacity onPress={() => {}}>
          <BgIcon
            color={COLORS.primaryWhiteHex}
            name={'add'}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_8}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default FlatListItemsCard;
