import { ERROR, LOADING, SUCCESS } from '../actionTypes';
import { useEffect, useReducer, useRef } from 'react';
//git 토큰 이 30일 제한이라서 30일 이후 삭제됨
const apiToken = import.meta.env.VITE_API_TOKEN;

function Header({ fetchUrl1, setUser }) {
  //========================================================= 순서2
  const initState = {
    loading: false,
    error: null,
    data: null,
  };

  //========================================================= 순서1
  const [state, dispatch] = useReducer(reducerFnc, initState);

  //========================================================= 순서4
  useEffect(() => {
    async function getUser() {
      dispatch({ type: LOADING });
      try {
        const response = await fetch(fetchUrl1, {
          headers: {
            Authorization: `token ${apiToken}`,
            'User-Agent': 'mygit_intro',
          },
        });
        const data = await response.json();
        //console.log(data);
        dispatch({ type: SUCCESS, fetchData: data });
      } catch (e) {
        dispatch({ type: ERROR, error: e.message });
      }
    }
    getUser();
  }, [fetchUrl1]);

  //========================================================= 순서3
  function reducerFnc(state, action) {
    switch (action.type) {
      case SUCCESS:
        return { ...state, loading: false, data: action.fetchData };
      case LOADING:
        return { ...state, loading: true, error: null };
      case ERROR:
        return { ...state, loading: false, error: action.error };
      default:
        throw new Error('정의되지 않은 액션');
    }
  }

  const sch_ref = useRef();

  function searchSubmitHandler() {
    let schKeyword = sch_ref.current.value.trim();
    // eduhsu3
    // gamcho3
    if (sch_ref.current.value.trim() === '') {
      schKeyword = 'eduhsu3';
    }
    console.log('검색어2', schKeyword);
    setUser(schKeyword);
    sch_ref.current.value = '';
  }

  return (
    <>
      {/* ================================================== 순서5 */}
      <h1>Git Repositories 가져오기</h1>
      <div className="top_search">
        <input type="text" className="sch_ipt" ref={sch_ref} />
        <button className="sch_btn" onClick={searchSubmitHandler}>
          검색
        </button>
      </div>
      {state.loading && <p>로딩중입니다...</p>}
      {state.error && <p>{state.error}</p>}
      {!state.loading && !state.error && state.data && (
        <>
          <img className="avatar" src={state.data.avatar_url} alt="" />
          <p>이름 : {state.data.login}</p>
          <p>팔로우 : {state.data.followers}</p>
        </>
      )}
    </>
  );
}

export default Header;
