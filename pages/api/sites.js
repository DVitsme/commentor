import db from '@/lib/firebase-admin';

export default async (req, res) => {
  const snapshot = await db.collection('sites').get();
  const sites = [];

  console.log(snapshot);
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  // const getDoc = sitesRef
  //   .get()
  //   .then((doc) => {
  //     if (!doc.exists) {
  //       console.log('No such document');
  //     }
  //     res.status(200).json(doc.data());
  //   })
  //   .catch((err) => {
  //     console.log(`Error getting doc: ${err}`);
  //   });
  res.status(200).json({ sites });
};
