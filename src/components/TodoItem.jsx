import CircleCheck from "./CircleCheck.jsx";
import PropTypes from "prop-types";
import {ACTIONS} from './Actions.jsx'


export default function TodoItem({task, dispatch, tasks, state}) {

    function completeTask(id) {
        dispatch({type: ACTIONS.COMPLETE, payload: {id: id}})
    }

    function deleteTask(e, id) {
        e.stopPropagation()
        dispatch({type: ACTIONS.DELETE, payload: {id: id}})
        console.log('updateStateID',state.updateState.taskId, 'DeleteTaskId',id)
        if (state.updateState.taskId === id) {
            state.setName('')
        }
        state.setUpdateState({taskId: undefined, editTask: false})
    }

    function editTask(e, id) {
        e.stopPropagation()
        state.setName(tasks.filter((task) => task.id === id)[0].name)
        state.setUpdateState({taskId: id, editTask: true})
    }

    return (
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 w-full p-2 cursor-pointer flex justify-between items-center"
            onClick={() => completeTask(task.id)}>
            <div className={'flex items-center'}>
                <CircleCheck checked={task.completed}/><span>{task.name}</span>
            </div>
            <div className={'flex items-center'}>
                <button className={'bg-red-500 hover:bg-red-600 text-gray-100 rounded px-2 py-1'}
                        onClick={(e) => deleteTask(e, task.id)}
                >Delete
                </button>
                <button className={'ms-2 bg-blue-500 hover:bg-blue-600 text-gray-100 rounded px-2 py-1'}
                        onClick={(e) => editTask(e, task.id)}
                >Edit
                </button>
            </div>
        </li>
    )
}
TodoItem.propTypes = {
    task: PropTypes.object,
    state: PropTypes.object,
    dispatch: PropTypes.func,
    tasks: PropTypes.array
}
