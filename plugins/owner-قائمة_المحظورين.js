

const handler = async (m, {conn, isOwner}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.owner_banlist


  const chats = Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned);
  const users = Object.entries(global.db.data.users).filter((user) => user[1].banned);
  const caption = `
╮${tradutor.texto1}
▢ المجموع : ${users.length} ${users ? '\n' + users.map(([jid], i) => `
◄ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
╯─────⩺

╮${tradutor.texto2}
▢ المجموع : ${chats.length} ${chats ? '\n' + chats.map(([jid], i) => `
◄ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
╯─────⩺
`.trim();
  m.reply(caption, null, {mentions: conn.parseMention(caption)});
};
handler.command = /^قائمة-المحظورين(ned)?|باند(ned)?list|daftarban(ned)?$/i;
handler.rowner = true;
export default handler;
