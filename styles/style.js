import {StyleSheet} from 'react-native';
import fontFamily from '../components/fontFamily';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },

  spacer: {
    flex: 1,
  },

  image: {
    height: 500,
    width: '100%',
  },

  titleText: {
    marginTop: 30,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#F9F5DD',
    fontSize: 19,
    textAlign: 'center',
    fontFamily: fontFamily.Light,
    lineHeight: 25,
  },
  button: {
    backgroundColor: '#BD8C2A',
    paddingVertical: 15,
    margin: 'auto',
    marginTop: 10,
    width: '85%',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontFamily: fontFamily.SemiBold,
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
  },
});

export default globalStyles;
