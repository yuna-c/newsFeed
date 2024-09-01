import { UseProvider } from './context/UserContext';
import { Wrap } from './styles/layout';
import Router from './shared/Router';

function App() {
  return (
    <UseProvider>
        <Wrap id="Wrap">
          <Router />
        </Wrap>
    </UseProvider>
  );
}

export default App;
