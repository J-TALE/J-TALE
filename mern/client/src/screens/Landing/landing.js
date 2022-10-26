import React, { Component } from "react";
import axios from "axios";
import "./landing.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { Navigate, useNavigate } from "react-router-dom";

function Landing() {
  const Navigate = useNavigate();
  const PageChange = () => {
    Navigate("/upload");
  }
  return (
    <div className="container">
      <h1 className="h1 title">
        Transcript to chatbot <br /> with a couple clicks
      </h1>
      <h4 className="subtitle">A flow-building plugin for Voiceflow</h4>
      <div className="buttonContainer">
        <GenericButton
          buttonType="blue"
          onClick={() => {PageChange()}}
          disabled={false}
          text={"Upload Transcript"}
        />
        <GenericButton
          buttonType="outline"
          onClick={() => null}
          disabled={false}
          text={"Recover Session"}
        />
      </div>
    </div>
  );
}
export default Landing

// export default class Landing extends Component {
//   // constructor(props) {
//   //   super(props)
//   // }

//   render() {
//   function PageChange() {
//     let Navigate = useNavigate();
//       Navigate("/upload");
//   }
//     return (
//       <div className="container">
//         <h1 className="h1 title">
//           Transcript to chatbot <br /> with a couple clicks
//         </h1>
//         <h4 className="subtitle">A flow-building plugin for Voiceflow</h4>
//         <div className="buttonContainer">
//           <GenericButton
//             buttonType="blue"
//             onClick={() => {console.log("hello"); PageChange()}}
//             disabled={false}
//             text={"Upload Transcript"}
//           />
//           <GenericButton
//             buttonType="outline"
//             onClick={() => null}
//             disabled={false}
//             text={"Recover Session"}
//           />
//         </div>
//       </div>
//     );
//   }
// }
