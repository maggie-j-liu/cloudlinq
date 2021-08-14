import firebase from "./firebase";
const saveUserPhoto = async (response) => {
  console.log(response.user.photoURL);
  const { additionalUserInfo, user } = response;
  if (!additionalUserInfo.isNewUser) return;
  const photoBlob = await fetch(user.photoURL).then((res) => res.blob());
  const storage = firebase.storage();
  const imageRef = storage.ref(`${user.uid}/profilePicture`);
  await imageRef.put(photoBlob);
  const url = await storage.ref(`${user.uid}/profilePicture`).getDownloadURL();
  await user.updateProfile({
    photoURL: url,
  });
  console.log(user);
};

export default saveUserPhoto;
