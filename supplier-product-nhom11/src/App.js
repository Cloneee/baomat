import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";
// import { useDispatch } from "react-redux";


function App() {
    // const dispatch = useDispatch();
    const maproutes = routes.map((route, index) => {
        return (
            <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        );
    });
  

    return (
        <Router>
            <ConfigProvider locale={viVN}>
                {/* {isLoading && <Loading location="Loading...." /> } */}
                <div className="App">
                    <Switch>{maproutes}</Switch>
                </div>
            </ConfigProvider>
        </Router>
    );
}

export default App;
