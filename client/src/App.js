import './App.css';
import WelcomePage from './components/WelcomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DevRegister from './components/DevRegister';
import DevLogin from './components/DevLogin';
import OrgRegister from './components/OrgRegister';
import OrgLogin from './components/OrgLogin';
import DashBoard from './components/DashBoard';
import SkillsPage from './components/SkillsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/devs/register' element={<DevRegister/>}/>
          <Route path='/devs/login' element={<DevLogin/>}/>
          <Route path='/devs/skills/languages' element={<SkillsPage/>}/>
          <Route path='/devs/skills/frameworks' element={<DashBoard/>}/>
          <Route path='/orgs/register' element={<OrgRegister/>}/>
          <Route path='/orgs/login' element={<OrgLogin/>}/>
          <Route path='/orgs/dashboard' element={<DashBoard/>}/>
          <Route path='/orgs/new' element={<DashBoard/>}/>
          <Route path='/orgs/jobs/:num' element={<DashBoard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
