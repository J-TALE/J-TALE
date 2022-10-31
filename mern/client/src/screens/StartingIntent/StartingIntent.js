import React from "react";
import "./StartingIntent.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useNavigate } from "react-router-dom";

function StartingIntent() {
  const Navigate = useNavigate();
  const PageChange = () => {
    Navigate("/");
  };
  return (
    <div className="container">
      <div className="intentContainer">
        <h1 className="h1 title">How can I help you today?</h1>
        <div>
          <div>
            <GenericButton buttonType="outline" text={"Order Pizza"} />
            <GenericButton buttonType="outline" text={"Order Drink"} />
          </div>
          <div>
            <GenericButton buttonType="outline" text={"Order Side"} />
            <GenericButton buttonType="outline" text={"Delivery problem"} />
          </div>
        </div>
        <div>
          <h4 className="subtitle">
            Select intents you would like to include by clicking once.
          </h4>
          <h4 className="subtitle">
            Choose a specific path by clicking again and selecting next.
          </h4>
        </div>
        <div>
          <GenericButton buttonType="outline" text={"Save"} />
          <GenericButton
            buttonType="disabled"
            text={"Go Back"}
            disabled={true}
          />
          <GenericButton
            buttonType="disabled"
            text={"Next"}
            disabled={true}
            onClick={PageChange}
          />
        </div>
      </div>
    </div>
  );
}
export default StartingIntent;

// export default class Landing extends Component {

//     render() {
//     return (
//       <div className="container">
//         <h1 className="h1 title">
//           Upload Transcript
//         </h1>
//         <div className="buttonContainer">
//         <button className="button1">Choose File</button>
//         </div>
//         <h4 className="subtitle">No file chosen</h4>
//         <div className="buttonContainer">
//         <GenericButton
//             buttonType="outline"
//             onClick={() => null}
//             disabled={false}
//             text={"Begin Session"}
//           />
//           <GenericButton
//             buttonType="outline"
//             onClick={() => null}
//             disabled={false}
//             text={"Go Back"}
//           />
//         </div>
//       </div>
//     );
//   }
// }
