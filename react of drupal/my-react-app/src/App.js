// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [response, setResponse] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://my-site.ddev.site/question_and_answer1_json', {
//           method: 'GET',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//           credentials: 'include' // אם צריך לשלוח עוגיות
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setResponse(data); // שמירת התגובה ב-state
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData(); // קריאה לפונקציה לאחר שהיא נוצרה
//   }, []);

//   return (
//     <div className="App">
//       <div>
//         <h1>Question and Answer</h1>
//       </div>
//       <div>
//         <ul>
//           {response.map((item, index) => (
//             <li key={index}>
//               <p>{item.field_questions}</p>
//               <p>{item.field_answer}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import QaA from './QuestionAndAnswer'

function App() {

  return (
    <div className="App">
      <QaA></QaA>
    </div>
  );
}

export default App;
