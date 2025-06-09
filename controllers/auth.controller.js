const { auth, db } = require('../firebase/firebase');
const validator = require('validator');
const axios = require('axios');

const FIREBASE_API_KEY = 'AIzaSyADQZIWLeDZp_EuyTA2vKfUSglQvTPFGhE'; // ← SUA CHAVE AQUI

const registerUser = async (req, res) => {
  try {
    const { nome, email, telefone, senha, tipo } = req.body;

    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Email inválido' });
    if (!validator.isMobilePhone(telefone, 'pt-BR')) return res.status(400).json({ error: 'Telefone inválido' });

    const userRecord = await auth.createUser({ email, password: senha });
    const id = userRecord.uid;

    await db.collection('usuarios').doc(id).set({
      id,
      nome,
      email,
      telefone,
      tipo: tipo || 'cliente',
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password: senha,
        returnSecureToken: true
      }
    );

    const { idToken, localId } = response.data;

    const userDoc = await db.collection('usuarios').doc(localId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado no Firestore' });
    }

    const user = userDoc.data();

    res.status(200).json({
      message: 'Login realizado com sucesso',
      token: idToken,
      user
    });
  } catch (error) {
    const errMsg = error.response?.data?.error?.message || error.message;
    res.status(401).json({ error: 'Email ou senha inválidos', details: errMsg });
  }
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await auth.generatePasswordResetLink(email);
    res.status(200).json({ message: 'Link de recuperação enviado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser, recoverPassword };
