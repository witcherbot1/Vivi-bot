
const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.owner_add_del_owner

  const why = `${tradutor.texto1[0]} ${usedPrefix + command} @${m.sender.split('@')[0]}*\n*◉ ${usedPrefix + command} ${m.sender.split('@')[0]}*\n*◉ ${usedPrefix + command} ${tradutor.texto1[0]}`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  if (!who) return conn.reply(m.chat, why, m, {mentions: [m.sender]});
  switch (command) {
    case 'اضافة-مالك':
      const nuevoNumero = who;
      global.owner.push([nuevoNumero]);
      await conn.reply(m.chat, tradutor.texto2, m);
      break;
    case 'حذف-مالك':
      const numeroAEliminar = who;
      const index = global.owner.findIndex(owner => owner[0] === numeroAEliminar);
      if (index !== -1) {
        global.owner.splice(index, 1);
        await conn.reply(m.chat, tradutor.texto3, m);
      } else {
        await conn.reply(m.chat, tradutor.texto4, m);
      }
      break;
  }
};
handler.command = /^(اضافة-مالك|حذف-مالك)$/i;
handler.rowner = true;
export default handler;
