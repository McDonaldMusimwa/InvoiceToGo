import { View, ActivityIndicator,StyleSheet } from "react-native";
import colors from "../../const/Colors";
function LoadingOverLay() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:colors.bluelight1
      },
})

export default LoadingOverLay;
