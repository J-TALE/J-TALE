import { getQAFromID } from "../DAO/QADAO";
//  import dao to call axios function
// manipulate data

// returns first QA pair from given flow json object
export function getQAIDFromFlow(flowObject) {
  return flowObject.current_question;
}

// qaID does not need to be manipulated so this function sends it straight to DAO
export async function sendToDAO(qaID) {
  // returns a QA object
  const qaObject = await getQAFromID(qaID);
  return qaObject;
}
