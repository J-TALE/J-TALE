import React, { useContext, useState } from "react";
import styles from "./StartingIntent.module.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import IntentButtons from "../../Components/IntentButtons/IntentButtons";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import QA from "../../utils/QA";
import { qaContext } from "../../Contexts/qaProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { IntentContext } from "../../Contexts/intentsProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";

function StartingIntent() {
  // Defining contexts and usestates
  const [, setcurrQAState] = useContext(qaContext);
  const [currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker] =
    useContext(SpeakerContext);
  const [intentState] = useContext(IntentContext);
  const [currQuestion, setCurrQuestion] = useState();
  const [
    ,
    ,
    nextQuestions,
    setNextQuestions,
    allQuestions,
    setAllQuestions,
    prevPrompt,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const [speechList, setSpeechList] = useContext(ScrollerContext);

  // Creating an instance of the QA class
  const QAdata = new QA();

  //Boolean for whether intents are being selected
  const [isIntents, setIsIntents] = useState(false);

  //Changes the states and identifiers of who's speech is being selected
  const handleSpeakerChange = () => {
    const prev = prevSpeaker;
    const curr = currSpeaker;
    setPrevSpeaker(curr);
    setSpeaker(prev);
    setIsIntents(!isIntents);
  };

  const handleQAChange = () => {
    //Speech is used as an identifier for selected question/intent
    const speech = getSpeech();

    // This if statement differentiates between whether we are choosing questions or intents
    // If !buttons, we are choosing questions and if buttons we are choosing intents
    if (isIntents) {
      const intent = currQuestion.intents.find((x) => x.value === speech);
      const lst = findNextQuestions(intent);
      setNextQuestions(lst);
      setSpeechList([
        ...speechList,
        {
          source: prevSpeaker,
          text: speech,
          question: intent,
          optionsLength: currQuestion.intents.length,
        },
      ]);

      const temp = [];
      // Find the currQuestions in allQuestions and update
      allQuestions.forEach((x) => {
        if (x.id === currQuestion.id) {
          temp.push(currQuestion);
        } else {
          temp.push(x);
        }
      });
      setAllQuestions(temp);

      // Then make call to DB
      setcurrQAState(currQuestion);
      QAdata.updateQA(currQuestion);
    } else {
      // Finds the QA from list of next questions
      const nextQA = nextQuestions.find((x) => x.question === speech);

      setCurrQuestion(nextQA); //Setting current question object
      setcurrQAState(nextQA);

      const temp = [];
      // Find the currQuestions in allQuestions and update the question included boolean
      allQuestions.forEach((x) => {
        if (x.id === currQuestion) {
          temp.push(currQuestion);
        }
        temp.push(x);
      });
      setAllQuestions(temp);

      // Makes Call to DB to update QA
      QAdata.updateQA(nextQA);

      setSpeechList([
        ...speechList,
        {
          source: prevSpeaker,
          text: speech,
          question: nextQA,
          optionsLength: nextQuestions.length,
        },
      ]);
    }

    // Disables continue button by resets intentState values to 0
    Object.keys(intentState).forEach((key) => {
      intentState[key] = 0;
    });
  };

  //Find the list of next questions, depending on the selected intent
  const findNextQuestions = (intent) => {
    const lst = [];
    allQuestions.forEach((x) => {
      if (intent.children.includes(x.id)) {
        lst.push(x);
      }
    });
    return lst;
  };

  //Gets the speech of the selected button
  const getSpeech = () => {
    const speech = Object.keys(intentState).find((x) => intentState[x] === 2);
    setPrevPrompt(speech);
    return speech;
  };

  return (
    <div className="container">
      <div className={styles.scroller}>
        <Scrollbar />
      </div>
      <div className={styles.intentContainer}>
        <h4 className={styles.speaker1}>{prevSpeaker}</h4>
        <h1 className={styles.intentTitle}>{prevPrompt}</h1>

        <div>
          {nextQuestions.length === 0 || currQuestion?.intents?.length === 0 ? (
            <>
              <h3 className={styles.completed}>
                Your flow has been completed! Click the transcript to jump back.
              </h3>
            </>
          ) : (
            <>
              <h4 className={styles.speaker2}>{currSpeaker}</h4>

              <IntentButtons
                intents={isIntents ? currQuestion.intents : nextQuestions}
                user={isIntents}
              />
              <div>
                <h4 className={styles.instructions}>
                  Select intents you would like to include by clicking once.
                </h4>
                <h4 className={styles.instructions1}>
                  Choose a specific path by clicking again and selecting next.
                </h4>
              </div>
            </>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <GenericButton
            buttonType={
              Object.values(intentState).some((x) => x === 2)
                ? "blue"
                : "disabled"
            }
            text={"Continue"}
            disabled={
              Object.values(intentState).some((x) => x === 2) ? false : true
            }
            onClick={() => {
              handleQAChange();
              handleSpeakerChange();
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default StartingIntent;
