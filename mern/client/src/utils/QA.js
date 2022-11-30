import axios from "axios";

export default class Parser {
  parse(transcript) {
    const lst = [];
    for (var i = 0; i < transcript.length; i++) {
      this.createQAs(transcript[i]);
      lst.push(this.initialQAID(transcript[i]));
    }
    return lst;
  }

  //Loops through all questions in the JSON object qlist, making them into objects in the databse
  async createQAs(qlist) {
    //qlist is a list of JSON objects that exists as questions/answer pairs
    for (var i = 0; i < qlist.length; i++) {
      try {
        await axios.post("http://localhost:5000/qa/add", qlist[i]);
      } catch (e) {
        console.log(e.response.data);
      }
    }
  }

  // Returns a list of the initial QA ids
  initialQAID(qlist) {
    if (qlist.length === 0) {
      return null;
    }
    return qlist[0].id; // Return the first item in the list which should be the top level question
  }
}