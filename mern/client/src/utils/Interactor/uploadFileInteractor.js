import uploadFileDAO from "../DAO/uploadFileDAO";

export default class uploadFileInteractor {
  constructor() {
    this.allQuestionList = [];
    this.uploadDAO = new uploadFileDAO();
  }
  // Checks if transcript file is a string and calls Upload Transcript
  uploadFile(transcript) {
    if (typeof transcript.name === "string") {
      const res = this.uploadDAO.uploadFile(transcript);
      return res;
    }
  }

  deleteFile(id) {
    return this.uploadDAO.deleteFile(id);
  }

  // Returns a list of the initial QA ids
  initialQAID(qlist) {
    if (qlist.length === 0) {
      return null;
    }
    return qlist[0].id; // Return the first item in the list which should be the top level question
  }

  //If all questions isn't empty, reset it to empty
  resetAllQuestions() {
    if (this.allQuestionList !== []) {
      this.allQuestionList = [];
    }
  }

  //Parses the given transcript and returns the list of starting IDs and the list of all question objects
  parse(transcript) {
    const startingList = [];
    this.resetAllQuestions();

    for (var i = 0; i < transcript.length; i++) {
      this.questionLoop(transcript[i]);
      startingList.push(this.initialQAID(transcript[i])); //Finds the ids of the starting question and pushes it to the list
    }
    return {
      startingList: startingList,
      allQuestionList: this.allQuestionList,
    };
  }

  //Loops through all questions in the JSON object qlist, sending to DB and ids to allQuestionList
  questionLoop(qlist) {
    //qlist is a list of JSON objects that exists as questions/answer pairs
    for (var i = 0; i < qlist.length; i++) {
      this.uploadDAO.createQA(qlist[i]);
      this.allQuestionList.push(qlist[i].id);
    }
  }

  async getQAList(idList) {
    // given a list of QA ids, returns list of QA objects
    const lst = [];
    for (var i = 0; i < idList.length; i++) {
      await this.uploadDAO.getQAByID(idList[i]).then((response) => {
        //If response is successful, change to next page and show the additional navbar info
        if (response.status) {
          lst.push(response.data);
        } else {
          console.log("ERROR GETTING QA OBJECT");
        }
      });
    }
    return lst;
  }

  // Loops through the questions list in flow and deletes each item (helper to qaDeleted)
  async removeQAs(flowAllQuestions) {
    var removed = true;
    for (var i = 0; i < flowAllQuestions.length; i++) {
      try {
        await this.uploadDAO.deleteqa(flowAllQuestions[i]);
      } catch {
        removed = false;
      }
    }
    return removed;
  }

  //Deletes QAs and returns status of success
  async qaDeleted(flowAllQuestions) {
    // Delete QAs associated with flow
    var qaDeleted = false;
    await this.removeQAs(flowAllQuestions).then((res) => {
      qaDeleted = res;
    });
    return qaDeleted;
  }
}
