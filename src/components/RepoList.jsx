import { ERROR, LOADING, SUCCESS } from '../actionTypes';
import { useEffect, useReducer } from 'react';
//git 토큰 이 30일 제한이라서 30일 이후 삭제됨
const apiToken = import.meta.env.VITE_API_TOKEN;

function RepoList({ fetchUrl2 }) {
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
        const response = await fetch(fetchUrl2, {
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
  }, [fetchUrl2]);

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

  return (
    <>
      {/* ================================================== 순서5 */}
      <div className="list_wrap">
        <h2 className="ti">레포지토리</h2>

        {state.loading && <p>로딩중입니다...</p>}
        {state.error && <p>{state.error}</p>}
        {!state.loading && !state.error && state.data && (
          <>
            <ul>
              {state.data.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    window.open(item.html_url, '_blank');
                  }}
                >
                  <p>{idx + 1}</p>
                  <h3>{item.full_name}</h3>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default RepoList;
