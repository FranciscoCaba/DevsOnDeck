import './App.css';
import WelcomePage from './components/WelcomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DevRegister from './components/DevRegister';
import DevLogin from './components/DevLogin';
import OrgRegister from './components/OrgRegister';
import OrgLogin from './components/OrgLogin';
import DashBoard from './components/DashBoard';
import LanguagesPage from './components/LanguagesPage';
import AddPosition from './components/AddPosition';
import DevDashBoard from './components/DevDashBoard';
import FrameworksPage from './components/FrameworksPage';
import DevsMatchingPosition from './components/DevsMatchingPosition';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/devs/register' element={<DevRegister/>}/>
          <Route path='/devs/login' element={<DevLogin/>}/>
          <Route path='/devs/skills/languages' element={<LanguagesPage/>}/>
          <Route path='/devs/skills/frameworks' element={<FrameworksPage/>}/>
          <Route path='/devs/dashboard' element={<DevDashBoard/>}/>
          <Route path='/orgs/register' element={<OrgRegister/>}/>
          <Route path='/orgs/login' element={<OrgLogin/>}/>
          <Route path='/orgs/dashboard' element={<DashBoard/>}/>
          <Route path='/orgs/jobs/new' element={<AddPosition/>}/>
          <Route path='/orgs/jobs/:num' element={<DevsMatchingPosition/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
