import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { Platform, PermissionsAndroid } from 'react-native'

class UserPermissions{
    getCameraPermission = async() =>{
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Cool Photo App Camera Permission',
                message:
                  'Cool Photo App needs access to your camera ' +
                  'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert('You can use the camera');
            } else {
                alert('Camera permission denied');
            }
          } catch (err) {
            alert(err);
          }
    }

}

export default new UserPermissions()
