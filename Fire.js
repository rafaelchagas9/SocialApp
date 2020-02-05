import firebase, { firestore } from 'firebase'
import { firebaseConfig } from './config';

class Fire{
    constructor(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }
    }

    uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };
          
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
          // this helps us get a blob
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          
          xhr.send(null);
        });
      }

    addPost = async(text, localUri) => {
        const remoteUri = await this.uploadPhotoAsync(localUri)
        var uid = firebase.auth().currentUser.uid
        return new Promise((res, rej)=>{
            firebase.database().ref('posts/'+uid+'/'+this.timestamp).set({
                uid: uid,
                timestamp: this.timestamp,
                image : remoteUri,
                text: text
              })
              .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
    }

    uploadPhotoAsync = async(uri) => {
        console.log('começando upload')
        const path = `photos/${this.uid}/${Date.now()}.jpg`

        return new Promise(async(res, rej) => {
            const file = await this.uriToBlob(uri)

            let upload = firebase.storage().ref(path).put(file)
            .then((snapshot)=>
            {
                let storage = firebase.storage()
                let ref = storage.ref(path)
                let getUrl = ref.getDownloadURL().then((url) => {
                    res(url);
                })
                
            })
            .catch((error)=>{
                alert(error)
                rej(error);
            })
        })
    }

    get firestore(){
        return firebase.firestore()
    }

    get uid(){
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp(){
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire