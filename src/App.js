import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList
  };
  handleToggleComplete = todoIdToToggle => event => {
    const newTodos = this.state.todos.slice()
    const newnewTodos = newTodos.map(todo => {
      if (todo.id === todoIdToToggle) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })
    this.setState({ todos: newnewTodos})
  }
  handleAddTodo = event => {
    if (event.key === 'Enter') {
      const newTodo = {
        userID: 1,
        id: Math.floor(Math.random() * 10000000),
        title: event.target.value,
        completed: false
      }
      const newTodos = this.state.todos.slice()
      newTodos.push(newTodo)
      this.setState({todos: newTodos})
      event.target.value = ""
    }
  }
  handleDelete = todoIdToDelete => event => {
    let newTodos = this.state.todos.filter(todo => todo.id !== todoIdToDelete)
    this.setState({ todos: newTodos })
  }
  handleDeleteCompleted = event => {
    let newTodos = this.state.todos.filter(todo => todo.completed === false)
    this.setState({todos: newTodos })
  }
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleAddTodo}
            autoFocus
          />
        </header>
        <TodoList
          todos={this.state.todos}
          handleToggleComplete={this.handleToggleComplete}
          handleDelete={this.handleDelete}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button
          className="clear-completed"
          onClick={this.handleDeleteCompleted}
          >Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={this.props.handleToggleComplete}
          />
          <label>{this.props.title}</label>
          <button
            className="destroy"
            onClick={this.props.handleDelete}
          />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title} 
              completed={todo.completed}
              handleToggleComplete={this.props.handleToggleComplete(todo.id)}
              handleDelete={this.props.handleDelete(todo.id)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
