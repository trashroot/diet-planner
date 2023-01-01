import { IonPage, IonRouterOutlet } from "@ionic/react"
import { Route, Redirect } from "react-router-dom"

import { RegisterContextProvider } from "../helper/RegisterContext"
import Profile from "../components/register/Profile"
// import Registration from "../components/register/Registration"

const RegisterPath: React.FC = ( ) => {
  return (
    <IonPage>
      <RegisterContextProvider>
        <IonRouterOutlet>
          <Route exact path="/registration/profile">
            <Profile />
          </Route>
          {/* <Route exact path="/registration/register">
            <Registration />
          </Route> */}
          <Redirect exact path='/registration' to="/registration/profile" />
        </IonRouterOutlet>
        </RegisterContextProvider>
    </IonPage> 
  )
}

export default RegisterPath