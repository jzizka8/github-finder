import { Header } from './Components/Header';
import { GithubUserInfo } from './Pages/GithubUserInfo';

function App() {
  return (
    <div className='flex items-center flex-col bg-zinc-100 px-4'>
      <Header />
      <GithubUserInfo />
    </div>
  )
}

export default App
