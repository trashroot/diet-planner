
import { useContext } from "react";
import { RegisterContext } from "../../helper/RegisterContext"

import  "./Register.css"

interface Steps {
    step?: string
}

const RegistrationSteps: React.FC<Steps> = ({ step }) => {
    let { RegistrationPages } = useContext(RegisterContext);
    let cls = "";

    let pages = Object.keys(RegistrationPages);

    let allSteps = pages.map((registrationStep) => {
        cls = "register_progress_style";
        if(RegistrationPages[registrationStep]){
            cls +=" register_progress_done";
        }
        return <span className={cls} key={registrationStep}></span>
    })

  return (
        <div className="ion-margin-vertical register_progress">
          {allSteps}
        </div>        
    )
}

export default RegistrationSteps