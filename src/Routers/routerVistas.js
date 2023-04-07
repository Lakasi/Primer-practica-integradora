import { Router } from 'express';
import { smsManager } from '../managers/messages.manager.js';

export const routerVistas = Router();
routerVistas.get('/', (req, res, next) => {
  res.redirect('/api/messages');
});


routerVistas.get('/api/messages', async (req, res, next) => {

  const mensajes = await smsManager.obtenerTodos()
  
  res.render('chat', {
    pageTitle: 'mensajes',
    hayMensajes: mensajes.length > 0,
    mensajes
  });
});
