// action type constant
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS'

// action creator functions
export const addTodo = todoTitle => {
    const newTodo = {
        userID: 1,
        id: Math.floor(Math.random() * 10000000),
        title: todoTitle,
        completed: false
      }
    return {
        type: ADD_TODO,
        payload: newTodo
    }
}
export const toggleTodo = todoId => {
    return {
        type: TOGGLE_TODO,
        payload: todoId
    }
}
export const deleteTodo = todoId => {
    return {
        type: DELETE_TODO,
        payload: todoId
    }
}
export const clearCompletedTodos = () => {
    return {
        type: CLEAR_COMPLETED_TODOS
    }
}
