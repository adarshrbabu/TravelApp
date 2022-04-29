import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Places from "./components/screens/Places";
import Place from "./components/screens/Place";
import NotFound from "./components/screens/NotFound";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import PrivateRoute from "./components/PrivateRoute";

export const userContext = React.createContext();

function App(props) {
    const [userdata, setUserdata] = useState({});
    const [loading, setLoading] = useState(true);
    const updateUserdata = (action) => {
        switch (action.type) {
            case "LOGOUT":
                setUserdata(null);
                localStorage.clear();
                break;
            case "LOGIN":
                setUserdata(action.payload);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setUserdata(JSON.parse(localStorage.getItem("user_data")));
        setLoading(false);
        // console.log(userdata);
    }, []);
    return loading ? (
        <h1>Loading....</h1>
    ) : (
        <div>
            <userContext.Provider value={{ userdata, updateUserdata }}>
                <Router>
                    <Switch>
                        <PrivateRoute path="/" exact component={Places} />
                        <Route path="/auth/login/" exact component={Login} />
                        <Route path="/auth/create/" exact component={Signup} />
                        <Route path="/place/:id" component={Place} />  
                        <Route component={NotFound} />  
                    </Switch>
                </Router>
            </userContext.Provider>
        </div>
    );
}

export default App;
