import {useEffect, useReducer, useState} from "react";
import {nanoid} from "nanoid";
import TodoList from "./components/TodoList.jsx";
import TodoItem from "./components/TodoItem.jsx";
import {Card, TextInput} from "flowbite-react";
import {ACTIONS} from './components/Actions.jsx'
import useDarkMode from "./darkmode/useDarkMode.js";


function reducer(tasks, action) {
    switch (action.type) {
        case ACTIONS.NEW_TODO:
            return [newTodo(action.payload.name), ...tasks]
        case ACTIONS.COMPLETE:
            return tasks.map((task) =>
                (task.id === action.payload.id ? {...task, completed: !task.completed} : task)
            )
        case ACTIONS.LOAD:
            return action.payload.data
        case ACTIONS.DELETE:
            return tasks.filter((task) => task.id !== action.payload.id)
        case ACTIONS.UPDATE:
            return tasks.map((task) =>
                (task.id === action.payload.id ? {...task, name: action.payload.name} : task))
        default:
            return tasks;
    }
}


function newTodo(name) {
    return {
        id: nanoid(),
        name: name,
        completed: false
    }
}


export default function TodoApp() {

    const [colorTheme, setTheme] = useDarkMode()

    const [tasks, dispatch] = useReducer(reducer, [])
    const [name, setName] = useState('')
    const [updateState, setUpdateState] = useState({taskId: undefined, editTask: false})

    useEffect(() => {
        (async () => {
            const storedTasks = JSON.parse(localStorage.getItem('tasks'));
            if (storedTasks && storedTasks.length > 0) {
                dispatch({
                    type: ACTIONS.LOAD,
                    payload: { data: storedTasks }
                });
            }
        })();
    }, []);


    useEffect(() => {

        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]);


    function updateTask() {
        dispatch({type: ACTIONS.UPDATE, payload: {id: updateState.taskId, name: name}})
        setUpdateState((prevUpdate) => ({...prevUpdate, editTask: false}))
        setName('')
    }

    function submit(e) {
        e.preventDefault()
        if (name.length === 0 || updateState.editTask) {
            return
        }
        dispatch({type: ACTIONS.NEW_TODO, payload: {name: name}})
        setName('')
    }

    return (
        <Card className={'mx-auto max-w-xl mt-10'}>
            <button className={'bg-gray-100 mr-auto px-2 py-1 rounded border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold'}
                onClick={() => setTheme((prevColorTheme) => prevColorTheme === 'dark' ? 'light' : 'dark')}>
                { colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1, colorTheme.length) }
            </button>
            <form onSubmit={submit} className={'flex items-center justify-between gap-x-2'}>
                <TextInput className={'w-full'} name={'name'} value={name} onChange={
                    (e) => setName(e.target.value)
                }/>
                {updateState.editTask &&
                    <button className={'bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded'} type={'button'}
                            onClick={() => {
                                updateTask()
                            }}>Update</button>}
            </form>
            <TodoList title={'Tasks'}>
                {tasks.map((task, index) => {
                    return <TodoItem
                        key={`list-item-${index}`}
                        state={{updateState, setUpdateState, setName}}
                        task={task}
                        tasks={tasks}
                        dispatch={dispatch}
                    />

                })}
            </TodoList>
        </Card>
    )
}