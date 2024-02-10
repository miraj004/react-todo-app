import ReactDOM from 'react-dom/client'
import './index.css'
import {StrictMode} from "react";
import TodoApp from "./TodoApp.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TodoApp/>
    </StrictMode>
)
