
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Adittional from './components/Adittional';
import Confirmation from './components/Confirmation';
import List from './components/List';
import Passengers from './components/Passengers';
import Payment from './components/Payment';
import Summary from './components/Summary';
import { useEffect } from 'react';
import { WorkflowService } from './services/Workflow.service';

function App() {
  useEffect(() => {
    window.addEventListener(
      'message',
      event => {
          if (event.data.key === 'SCROLL') {
              if (event.data.value === 'GO_UP') {
                window.scrollTo({top: 0, behavior: 'smooth'});
              } else {
                window.scrollTo({top: 1000, behavior: 'smooth'});
              }
              return;
          }
          if (event.data.key === 'GET_STEP') {
            window.parent.postMessage({ key: 'GET_STEP', value: WorkflowService.getStep() }, '*');
          }
      },
      false,
    );
  }, []);

  return (
    <div className="App">
      <BrowserRouter>      
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/adittional/:token" element={<Adittional></Adittional>}></Route>
          <Route path="/confirmation/:token" element={<Confirmation></Confirmation>}></Route>
          <Route path="/passengers/:token" element={<Passengers></Passengers>}></Route>
          <Route path="/payment/:token" element={<Payment></Payment>}></Route>
          <Route path="/summary/:token" element={<Summary></Summary>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
