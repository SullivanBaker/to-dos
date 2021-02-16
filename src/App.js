import React, { Component } from "react"
import "./index.css"
import todosList from "./todos.json"
import TodoList from "./todoList.js"
import { Route , NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { addTodo , toggleTodo ,  deleteTodo , clearCompletedTodos } from './actions'

class App extends Component {
  state = {
    todos: todosList
  }
  findItemsLeft = event => {
    let items = 0
    for (let i=0; i<this.props.todos.length; i++) {
      if (this.props.todos[i].completed === false) {
        items = items + 1
      }
    }
    return items
  }
  handleToggleComplete = todoIdToToggle => event => {
    this.props.toggleTodo(todoIdToToggle)
  }
  handleAddTodo = event => {
    if (event.key === "Enter") {
      this.props.addTodo(event.target.value)
      event.target.value = ""
    }
  }
  handleDelete = todoIdToDelete => event => {
    this.props.deleteTodo(todoIdToDelete)
  }
  handleDeleteCompleted = event => {
    this.props.clearCompletedTodos()
  }
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>to-dos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleAddTodo}
            autoFocus
          />
        </header>
        <Route exact path='/'>
          <TodoList
            todos={this.props.todos}
            handleToggleComplete={this.handleToggleComplete}
            handleDelete={this.handleDelete}
          />
        </Route>
        <Route path="/active">
          <TodoList
            todos={this.props.todos.filter(todo => todo.completed === false)}
            handleToggleComplete={this.handleToggleComplete}
            handleDelete={this.handleDelete}
          />
        </Route>
        <Route path="/completed">
          <TodoList
            todos={this.props.todos.filter(todo => todo.completed === true)}
            handleToggleComplete={this.handleToggleComplete}
            handleDelete={this.handleDelete}
          />
        </Route>
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.findItemsLeft()}</strong> item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact to="/" activeClassName='selected'>All</NavLink>
            </li>
            <li>
              <NavLink to="/active" activeClassName='selected'>Active</NavLink>
            </li>
            <li>
              <NavLink to="/completed" activeClassName='selected'>Completed</NavLink>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleDeleteCompleted}>Clear completed</button>
        </footer>
      </section>
    )
  }
}

const mapStatetoProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompletedTodos
}

export default connect(mapStatetoProps, mapDispatchToProps)(App)