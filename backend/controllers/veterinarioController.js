import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarid.js";
const registrar = async (req, res) => {
  // const { email, password, nombre } = req.body;
  const { email } = req.body;
  //prevenir duplicados
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Ususario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    //guardar
    const veterinario = new Veterinario(req.body);
    const VeterinarioGuardado = await veterinario.save();
    res.json(VeterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
  //console.log(email);
};

const perfil = (req, res) => {
  const { veterinario } = req;
  res.json({ perfil: veterinario });
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msg: "confirmando correctamente" });
  } catch (error) {
    console.log(error);
  }
  console.log(usuarioConfirmar);
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //comprobar si existe el usuario
  const usuario = await Veterinario.findOne({ email });
  if (!usuario) {
    const error = new Error("Usuario no existe");
    return res.status(403).json({ msg: error.message });
  }
  //comprobar si esta confirmado o no
  if (!usuario.confirmado) {
    const error = new Error("tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //revisar áss
  if (await usuario.comprobarPassword(password)) {
    //autenticar
    res.json({ token: generarJWT(usuario.id) });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res, next) => {
  const { email } = req.body;
  const existeVeterinario = await Veterinario.findOne({ email });
  if (!existeVeterinario) {
    const error = new Error("el usario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    res.json({ msg: "hemos enviado istrucciones a tu emaol" });
  } catch (error) {
    console.log(error);
  }
};
const comprobarToken = async (req, res, next) => {
  const { token } = req.params;
  const tokenValido = await Veterinario.findOne({ token });
  if (tokenValido) {
    //el token es valido uy existe el usuario
    res.json({ msg: "token valido y es usuario existe" });
  } else {
    const error = new Error("token no valido");
    return res.status(400).json({ msg: error.message });
  }
};
const nuevoPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    const error = new Error("hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
