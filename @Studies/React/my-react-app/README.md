# React.js 에서 API 적용하기
**http://localhost:3001/data** 경로에서 데이터를 제공한다고 가정하고, 실제 데이터를 생성하고 이를 화면에 표시하는 예제를 만들어보겠습니다.

<br />

## 1. JSON Server 설치 및 설정
**json-server**는 로컬에서 간단한 API 서버를 설정할 수 있게 해주는 툴입니다. 이를 통해 데이터를 제공하는 API를 만들 수 있습니다.
```
npm install -g json-server
```
이제 프로젝트 루트에 **db.json** 파일을 생성하고 데이터를 추가합니다.

**db.json**
```
{
  "data": [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"},
    {"id": 3, "name": "Item 3"},
    {"id": 4, "name": "Item 4"},
    {"id": 5, "name": "Item 5"}
  ]
}
```
JSON Server를 실행하여 로컬 API 서버를 시작합니다.
```
json-server --watch db.json --port 3001
```
이제 **http://localhost:3001/data** 경로에서 데이터를 제공하는 API 서버가 실행됩니다.

<br />
<br />

## 2. React 프로젝트에서 API 데이터 사용하기
React 프로젝트를 설정하고, API를 호출하여 데이터를 화면에 표시하는 컴포넌트를 작성합니다.

### 프로젝트 초기 설정
```
npx create-react-app my-react-app
cd my-react-app
```
### DataList 컴포넌트 작성
**src/DataList.js**
```
import React, { useState, useEffect } from 'react';

function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;
```
### App 컴포넌트에서 DataList 사용
**src/App.js**
```
import React from 'react';
import DataList from './DataList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App</h1>
        <DataList />
      </header>
    </div>
  );
}

export default App;
```

### 엔트리 포인트 설정
**src/index.js**
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

<br />
<br />

## 상세 설명
### 1. JSON Server 설치 및 설정:
- **json-server**를 사용하여 로컬에서 간단한 API 서버를 설정합니다.
- **db.json** 파일을 생성하고 데이터를 추가합니다.
- `json-server --watch db.json --port 3001` 명령을 사용하여 서버를 시작합니다.

### 2. React 프로젝트 설정:
- `npx create-react-app my-react-app` 명령을 사용하여 새로운 React 프로젝트를 생성합니다.

### 3. DataList 컴포넌트:
- **useState**와 **useEffect** 훅을 사용하여 상태를 관리하고 API 호출을 처리합니다.
- **fetch** API를 사용하여 **http://localhost:3001/data** 경로에서 데이터를 가져옵니다.
- 데이터를 가져오는 동안 로딩 상태를 표시하고, 에러가 발생하면 에러 메시지를 표시합니다.
- 데이터를 성공적으로 가져오면 리스트 형태로 렌더링합니다.

### 4. App 컴포넌트:
- **App** 컴포넌트에서 **DataList** 컴포넌트를 포함하여 데이터를 화면에 표시합니다.

이 예제를 통해 React에서 로컬 API 서버를 사용하여 데이터를 가져오고 화면에 표시하는 방법을 배울 수 있습니다. 실제 프로젝트에서는 백엔드 서버의 API를 호출하여 데이터를 처리하게 됩니다.