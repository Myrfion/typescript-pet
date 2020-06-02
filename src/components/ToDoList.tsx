import React from "react"
import { IconButton, Checkbox, Paper } from "@material-ui/core"
import { format } from "date-fns"
import { IToDoItem } from "../types"
import DeleteIcon from "@material-ui/icons/Delete"

type Props = {
  list: Array<IToDoItem>
  onDone: (taskId: string) => void
  onDelete: (taskId: string) => void
}

const ToDoList: React.FC<Props> = (props: Props) => {
  const { list, onDone, onDelete } = props

  return (
    <div className="flex flex-col">
      {list.map(item => {
        const dateString = format(item.date, "hh:mm")

        return (
          <Paper key={item.id} className="mt-4 flex items-center py-2 pr-2">
            <Checkbox onClick={() => onDone(item.id)} checked={item.done} />
            <div className="w-full flex justify-between items-center mr-2">
              <p className="text-base">{item.name}</p>
              <p className="text-base font-medium">{dateString}</p>
            </div>
            <IconButton onClick={() => onDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        )
      })}
    </div>
  )
}

export default ToDoList
