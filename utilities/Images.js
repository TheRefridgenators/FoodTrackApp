import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";

export async function partialItemPathToLink(uuidPath) {
  const userUid = firebase.auth().currentUser.uid;
  const imageLink = await firebase
    .storage()
    .ref(`items/${userUid}/${uuidPath}`)
    .getDownloadURL();

  return imageLink;
}