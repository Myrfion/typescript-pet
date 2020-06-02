import React, { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import ToDoList from "./components/ToDoList"
import { IToDoItem } from "./types"
import "./styles/tailwind.css"

let id: number = 0

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("")
  const [list, setList] = useState<Array<IToDoItem>>([])
  const [message, setMessage] = useState<string>("")

  function addTask(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter") {
      return
    }

    if (title === "") {
      setMessage("Task can't be empty")

      return
    }

    const nextItemId = (id + 1).toString()
    id += 1

    const newItem: IToDoItem = {
      name: title,
      date: new Date(),
      id: nextItemId,
      done: false
    }

    setList(prev => [...prev, newItem])
    setTitle("")
    setMessage("")
  }

  function doneTask(taskId: string) {
    setList(prev => {
      return prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            done: true
          }
        }
        return task
      })
    })
  }

  function deleteTask(taskId: string) {
    setList(prev => {
      return prev.filter(task => task.id !== taskId)
    })
  }

  return (
    <div className="flex flex-col p-4 w-1/3">
      <h1 className="text-2xl font-bold mb-4">Todo List with the typescript</h1>
      <TextField
        label="Enter title"
        value={title}
        onChange={event => setTitle(event.currentTarget.value)}
        variant="outlined"
        classes={{ root: "w-full" }}
        onKeyPress={addTask}
        error={Boolean(message)}
        helperText={message}
      />
      <ToDoList list={list} onDone={doneTask} onDelete={deleteTask} />
    </div>
  )
}

export default App
