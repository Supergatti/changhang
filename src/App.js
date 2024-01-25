import logo from './logo.svg';
import './App.css';
import Index from './pages/index/Index';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import WaterLevel from "./pages/admin/baswaterlevel/WaterLevel"
import BasFileUpload from "./pages/admin/basfileupload/BasFileUpload"
import BasForecastRecord from "./pages/admin/basforecastrecord/BasForecastRecord"
import WaterSiteForecast from "./pages/admin/watersiteforecast/WaterSiteForecast"
import WaterSiteForecastDetails from "./pages/admin/watersiteforecast/WaterSiteForecastDetails"
import WaterSiteDeviationDetails from "./pages/admin/watersiteforecast/WaterSiteDeviationDetails"
import WaterSiteForecastOther from "./pages/admin/watersiteforecastother/WaterSiteForecastOther"
import WaterSiteForecastOtherDetails from "./pages/admin/watersiteforecastother/WaterSiteForecastOtherDetails"
import WaterSiteDeviationOtherDetails from "./pages/admin/watersiteforecastother/WaterSiteDeviationOtherDetails"

import BasForecastRecordDetails from "./pages/admin/basforecastrecord/BasForecastRecordDetails"
import UserManage from"./pages/admin/userManage/UserManage"
import Hello from"./pages/admin/Hello/Hello"


import OtherWaterLevel from "./pages/admin/OtherWaterLevel/OtherWaterLevel" // 其他站点水位
import ManualForecast from "./pages/admin/ManualForecast/ManualForecast"// 人工预测水位
import SevenDays from "./pages/admin/SevenDays/SevenDays"   // 七天水位预测对比
import Login from "./pages/admin/login/login"// 登陆页面

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Index>
            <Route path='/BasFileUpload'  component={BasFileUpload}/>
            <Route path='/WaterLevel'  component={WaterLevel}/>
            <Route path='/BasForecastRecord'  component={BasForecastRecord}/>
            <Route path='/WaterSiteForecast'  component={WaterSiteForecast}/>
            <Route path='/BasForecastRecordDetails/:id'  component={BasForecastRecordDetails}/>
            <Route path='/WaterSiteForecastDetails/:id'  component={WaterSiteForecastDetails}/>
            <Route path='/WaterSiteDeviationDetails/:id/:name'  component={WaterSiteDeviationDetails}/>
            {/*<Route path='/WaterSiteForecastOther'  component={WaterSiteForecastOther}/>*/}
            <Route path='/WaterSiteForecastOtherDetails/:id'  component={WaterSiteForecastOtherDetails}/>
            <Route path='/WaterSiteDeviationOtherDetails/:id'  component={WaterSiteDeviationOtherDetails}/>
            <Route path='/UserManage'  component={UserManage}/>
            <Redirect from ="/" to = "/BasFileUpload"/>
            {/* 其他站点水位 */}
            <Route path='/OtherWaterLevel'  component={OtherWaterLevel}/>
            <Route path='/ManualForecast'  component={ManualForecast}/>
            <Route path='/SevenDays'  component={SevenDays}/>
            <Route path='/Hello'  component={Hello}/>
          </Index>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
