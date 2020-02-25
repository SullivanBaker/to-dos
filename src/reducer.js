import todosList from "./todos.json"
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_COMPLETED_TODOS } from "./actions.js"

const inititalState = {
  todos: todosList
}
const todosReducer = (state = inititalState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodosList = state.todos.slice()
      newTodosList.push(action.payload)
      return { todos: newTodosList }
    }
    case TOGGLE_TODO: {
      const newTodosList = state.todos.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })
      return { todos: newTodosList }
    }
    case DELETE_TODO: {
      const newTodosList = state.todos.filter(todo => todo.id !== action.payload)
      return { todos: newTodosList }
    }
    case CLEAR_COMPLETED_TODOS: {
      const newTodosList = state.todos.filter(todo => todo.completed === false)
      return { todos: newTodosList }
    }
    default:
      return state
  }
}

export default todosReducer