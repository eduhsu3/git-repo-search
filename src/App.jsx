import { useState } from 'react';
import './App.css';
import Header from './components/header';
import RepoList from './components/RepoList';

function App() {
  // const initUser = 'eduhsu3';
  //const initUser = 'gamcho3';
  const [user, setUser] = useState('gamcho3');

  const fetchUrl1 = `https://api.github.com/users/${user}`;
  const fetchUrl2 = `https://api.github.com/users/${user}/repos?sort=created`;
  console.log('부모에서 체크', user);
  console.log('부모에서 체크', fetchUrl1);
  console.log('부모에서 체크', fetchUrl2);

  return (
    <>
      <Header fetchUrl1={fetchUrl1} setUser={setUser} />
      <RepoList fetchUrl2={fetchUrl2} />
    </>
  );
}

export default App;
