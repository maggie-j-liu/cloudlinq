import firebase from "./firebase";
const getPageInfo = async (pagename) => {
  const db = firebase.database();
  const currentPageKey = await db
    .ref(`pageNames/${pagename}`)
    .once("value")
    .then((snap) => snap.val());
  if (!currentPageKey) {
    return {
      error: true,
    };
  }
  const pageInfo = await db
    .ref(`pages/${currentPageKey}`)
    .once("value")
    .then((snap) => snap.val());
  return {
    error: false,
    pageKey: currentPageKey,
    ...pageInfo,
  };
};
export default getPageInfo;
