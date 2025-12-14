export async function getChats() {
  const res = await fetch("http://localhost:4000/api/chats");
  return res.json();
}

export async function getChatMessages(sessionId) {
  const res = await fetch(`http://localhost:4000/api/chats/${sessionId}`);
  return res.json();
}
