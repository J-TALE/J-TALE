import React, { useContext, useState, useEffect } from "react";
import styles from "./savingSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modals/GenericModal";
import emailjs from "emailjs-com";
import { FlowContext } from "../../Contexts/flowProvider";
import { SessionContext } from "../../Contexts/sessionProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { IntentContext } from "../../Contexts/intentsProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import Alert from "../../Components/Alerts/GenericAlert";

export default function SavingSession() {
  const [
    currFlow,
    setFlowState,
    ,
    setFlowStartingQuestions,
    ,
    setFlowAllQuestions,
  ] = useContext(FlowContext);
  const [, setcurrQAState] = useContext(qaContext);
  const [, setIntentState] = useContext(IntentContext);
  const [currSpeaker, setSpeaker, , setPrevSpeaker, , setIsIntents] =
    useContext(SpeakerContext);
  const [
    ,
    setIsFirstQuestion,
    ,
    setNextQuestions,
    ,
    setAllQuestions,
    ,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const [speechList, setSpeechList] = useContext(ScrollerContext);
  const [sessionID, setSessionID, , setTranscriptID] =
    useContext(SessionContext);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [showClipboardConfirmation, setClipboardConfirmation] = useState(false);

  const Navigate = useNavigate();
  const PageChange = (url) => {
    Navigate(url);
  };

  const handleEmailNameChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email !== "" && !email.match(validEmailRegex)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }, [email, validEmail]);

  const sendMail = () => {
    const data = {
      flow: currFlow.name,
      session: sessionID,
      email: email,
    };

    emailjs
      .send("service_3mrwlug", "template_xesdddp", data, "8MLzKnR9kn5hriP6p")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const resetEnd = () => {
    resetContext();
  };

  const resetGoBack = () => {
    // Need to pop the most recent item from the transcript list if it is a question
    if (currSpeaker === "Bot:") {
      const temp = speechList;
      setSpeechList(temp);
    }
  };

  const resetContext = () => {
    setSessionID(null);
    setcurrQAState({});
    setFlowState({});
    setFlowStartingQuestions([]);
    setFlowAllQuestions([]);
    setSpeaker("Bot:");
    setPrevSpeaker("User:");
    setIsFirstQuestion(true);
    setNextQuestions([]);
    setAllQuestions([]);
    setPrevPrompt("This is the start of your flow.");
    setSpeechList([]);
    setTranscriptID(null);
    setIntentState({});
    setIsIntents(false);
  };

  return (
    <div>
      <Alert
        show={showClipboardConfirmation}
        success={true}
        message="Copied to clipboard!"
      />
      <div>
        <h1 className={styles.pageTitle}> Session Saved </h1>
        <h4 className={styles.subTitle}>
          You will need your session ID to continue next time.
        </h4>
        <div className={styles.inputForm}>
          <label className={styles.label}> Your Session ID </label>
          <input
            className={styles.input}
            type="text"
            readOnly
            placeholder={sessionID}
          />
          <div className={styles.buttonRow}>
            <GenericButton
              buttonType="white"
              onClick={() => {
                navigator.clipboard.writeText(sessionID);
                setClipboardConfirmation(true);
                setTimeout(() => {
                  setClipboardConfirmation(false);
                }, 1000);
              }}
              disabled={false}
              text={"Copy to Clipboard"}
            />
            <GenericButton
              buttonType="white"
              onClick={() => {
                setShowModal(true);
              }}
              disabled={false}
              text={"Email Session ID"}
            />
            {setShowModal && (
              <Modal
                show={showModal}
                title="Please Enter Your Email"
                body=""
                input={true}
                value={email}
                valid={email === "" || validEmail}
                alert="Please Enter a Valid Email"
                onChange={handleEmailNameChange}
                onClose={() => {
                  setShowModal(false);
                }}
                onSubmit={() => {
                  if (email !== "" && validEmail) {
                    sendMail();
                    setShowModal(false);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <GenericButton
          buttonType="blue"
          onClick={() => {
            PageChange("/");
            resetEnd();
          }}
          disabled={false}
          text={"End Session"}
        />
        <GenericButton
          buttonType="outline"
          onClick={() => {
            PageChange("/startingintent");
            resetGoBack();
          }}
          disabled={false}
          text={"Go Back"}
        />
      </div>
    </div>
  );
}
