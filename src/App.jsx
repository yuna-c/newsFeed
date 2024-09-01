import { UserProvider } from './context/UserContext'; // 수정된 import
import { Wrap } from './styles/layout';
import Router from './shared/Router';

function App() {
  return (
    <UserProvider> {/* 수정된 부분 */}
      <Wrap id="Wrap">
        <Router />
      </Wrap>
    </UserProvider>
  );
}

export default App;
