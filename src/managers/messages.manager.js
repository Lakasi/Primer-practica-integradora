import mongoose from "mongoose"

const schemaChat = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true }
}, { versionKey: false })


class messagesManager {
  constructor() {
    this.chatDB = mongoose.model('messages', schemaChat)
  }

  async guardar(ms) { 
    const sms = await this.chatDB.create(ms)
    return sms
  }

  async obtenerTodos() { 
    const sms = await this.chatDB.find().lean()
    return sms
  }

  async obtenerPorId(id) { 
    const sms = await this.chatDB.findById(id).lean()
    return sms
  }

}

export const smsManager = new messagesManager()