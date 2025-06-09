const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

/*
// Teste de leitura simples
db.collection("teste")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    console.log("✅ Conexão com o Firestore (backend) OK!");
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar no Firestore:", error);
  });
*/
module.exports = { admin, db, auth };
