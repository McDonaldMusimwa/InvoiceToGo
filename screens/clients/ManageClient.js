import {View,Textm,StyleSheet} from 'react-native';
import ManageClientForm from '../../components/client/ManageClientForm';
import { storeClient } from '../../util/https';


function ManageClient({route,navigation}){
    const selectClient = route.params
function onSubmitHandler(clientData){
    storeClient(clientData)
}
    return (<View style={styles.manageClientBackground}>
        <ManageClientForm defaultValue={selectClient} isEditing={selectClient ? true : false} onSubmitHandler={onSubmitHandler} onCancel={()=>(navigation.goBack())}/>
        </View>)
}
const styles =StyleSheet.create({
    manageClientBackground:{
        flex:1
    }
})
export default ManageClient