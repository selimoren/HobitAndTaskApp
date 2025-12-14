import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  cardBase: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F6F6',
    height: 250,
    width: 150,
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: windowHeight * 0.027,
    fontWeight: 'bold',
    color: 'black',
  },
  text:{
    fontSize: windowHeight * 0.02,
    color: 'black',
  },
});


export default styles;