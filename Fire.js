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
        const remoteUri = await this.uploadPostPhoto(localUri)
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

    registerUserOnDatabase = (name, url) => {
        var uid = firebase.auth().currentUser.uid
        var profilePicture = url

        return new Promise((res, rej)=>{
            firebase.database().ref('users/'+uid).set({
                uid: uid,
                registerTime: this.timestamp,
                name,
                profilePicture
              })
              .then(ref => {
                res(ref)
            })
            .catch(error => {
                this.errorCreatingAccount(error)
                rej(error)
            })
        })

    }

    uploadProfilePhoto = async(uri, name) => {
        if(uri == null){
            var user = firebase.auth().currentUser;
                user.updateProfile({
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/teste-b93c3.appspot.com/o/default%2Fuser.png?alt=media&token=7002a6de-fa02-410f-b934-9a022eb35c87'
                }).then(() => {
                        this.registerUserOnDatabase(name, 'https://firebasestorage.googleapis.com/v0/b/teste-b93c3.appspot.com/o/default%2Fuser.png?alt=media&token=7002a6de-fa02-410f-b934-9a022eb35c87')
                }).catch(function(error) {
                    this.errorCreatingAccount(error)
                });
                return
        }
        const path = `profile_pictures/${this.uid}/${Date.now()}.jpg`

        return new Promise(async(res, rej) => {
            const file = await this.uriToBlob(uri)

            let upload = firebase.storage().ref(path).put(file)
            .then((snapshot)=>
            {
                let storage = firebase.storage()
                let ref = storage.ref(path)
                let getUrl = ref.getDownloadURL().then((url) => {
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        photoURL: url
                    }).then(() => {
                        this.registerUserOnDatabase(name, url)
                    }).catch((error) => {
                        this.errorCreatingAccount(error)
                    });
                    res(url);
                })
                
            })
            .catch((error)=>{
                alert(error)
                rej(error);
            })
        })

    }

    errorCreatingAccount(error){
        var user = firebase.auth().currentUser;
        alert('Falha ao criar sua conta '+error)
        user.delete()
        firebase.auth().signOut()
    }

    uploadPostPhoto = async(uri) => {
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