import {Dimensions} from 'react-native';
import Colors from './Colors';

const entireScreenWidth = Dimensions.get('window').width; //pixel units
const entireScreenHeight = Dimensions.get('window').height; //pixel units

export const vwPixelAspectRatio = entireScreenWidth / 100;
export const vhPixelAspectRatio = entireScreenHeight / 100;

export const vwToPixelNumber = (vwNumber: number) => {
  return vwPixelAspectRatio * vwNumber;
};
export const vhToPixelNumber = (vhNumber: number) => {
  return vhPixelAspectRatio * vhNumber;
};

export default {
  $vw: vwPixelAspectRatio,
  $vh: vhPixelAspectRatio,

  $colorPrimary: Colors.primary,
  $colorSecondary: Colors.secondary,
  $colorBackground: Colors.background,
  $colorBlack: Colors.black,
  $colorUltrablack: Colors.ultraBlack,
  $colorGray: Colors.gray,
  $colorGrayCircles: Colors.grayCircles,
  $colorRed: Colors.red,
  $colorWhite: Colors.white,
  $colorYellow: Colors.yellow,
  $colorTransparent: Colors.transparent,

  $fontFamilyThin: 100,
  $fontFamilyExtraLight: 200,
  $fontFamilyLight: 300,
  $fontFamilyRegular: 400,
  $fontFamilyMedium: 500,
  $fontFamilySemiBold: 600,
  $fontFamilyBold: 700,
  $fontFamilyExtraBold: 800,
  $fontFamilyBlack: 900,
};
