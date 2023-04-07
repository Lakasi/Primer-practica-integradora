import { smsManager } from "../managers/messages.manager.js";


export async function postMessages(req, res, next) {
  const mensaje = req.body;
  const result = await smsManager.guardar(mensaje);
  console.log(result);
  res.json(result);
}
