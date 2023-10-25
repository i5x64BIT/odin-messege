const HOSTNAME = import.meta.env.VITE_API_HOSTNAME

const sendMessege = async (text) => {
  const res = await fetch(HOSTNAME + "/api/messeges?text=" + text, {
    method: "POST",
  });
  const data = await res.json();
  return data;
};
const upvoteMessege = async (id) => {
  const res = await fetch(`${HOSTNAME}/api/messeges?_id=${id}&action=up`, {
    method: "PUT",
  });
  const data = await res.json();
  return data;
};
const downvoteMassage = async (id) => {
  const res = await fetch(`${HOSTNAME}/api/messeges?_id=${id}&action=down`, {
    method: "PUT",
  });
  const data = await res.json();
  return data;
};
const getMesseges = async () => {
  const res = await fetch(`${HOSTNAME}/api/messeges`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export { sendMessege, upvoteMessege, downvoteMassage, getMesseges };
