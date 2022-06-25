import React, {useState} from 'react'
import './App.css'
function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: "Learn JS", status: 0},
        {id: 2, title: "Code a Todo List", status: 1},
    ])
    const [showIncomplete, setShowIncomplete] = useState(true)
    
    const [newTask, setNewTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newTask){
            const task =  {id: Date.now(), title: newTask, status: 0}
            setTasks([...tasks, task])
            setNewTask('')
        }

    }
    const setTaskStatus = (taskId, status) => {
        setTasks(
            tasks.map((task)=>{
                if(task.id === taskId){
                    return {...task, status: status ? 1 : 0}
                }
                return task
            })
        )
    }

    const removeTask = (taskId) => {
        setTasks(tasks.filter((task)=> task.id !== taskId))
    }

    const handleInputChange = (e) => {
        setNewTask(e.target.value)
    }
    return (
    <div className="container">
    <h1 className="title">
      Todo List
      <span>Get things done, one item at a time.</span>
    </h1>
    <ul className="task-list">
        {tasks.filter((task) => showIncomplete ? task.status !==1 : true ).map((task)=> (
            <li key={task.id} className={task.status ? 'done' : ''}>
            <span className="label">{task.title}</span>
            <div className="actions">
              <input type="checkbox" className="btn-action btn-action-done" checked={task.status}
              onChange={(e)=> setTaskStatus(task.id, e.target.checked)} />
              <button className="btn-action btn-action-delete" onClick={() => removeTask(task.id)}>✖</button>
            </div>
          </li>
        ))}
    </ul>
    <div className="filter-wrapper">
      <label htmlFor="filter" className="filter-label">
        Show incompleted tasks only
      </label>
      <input type="checkbox" id="filter" checked={showIncomplete} onChange={(e)=>setShowIncomplete(e.target.checked)} />
    </div>
    <form action="#" className="htmlForm" onSubmit={handleSubmit}>
      <label htmlFor="newitem">Add to the todo list</label>
      <input type="text" id="newitem" value={newTask} onChange={handleInputChange}/>
      <button type="submit">Add Item</button>
    </form>
  </div>
  )
}

export default App