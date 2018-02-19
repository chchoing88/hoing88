import React, { Component } from 'react';
import './App.css';
import uuidv4 from 'uuid/v4';


class App extends Component {
  constructor(...args){
    super(...args)
    this.doneStyle = {
      textDecoration : 'line-through'
    }
    
    this.state = {
      message : [
        {
          id : uuidv4(),
          text : 'merlin',
          isComplete : false,
          isEdit : false
        },
        {
          id : uuidv4(),
          text : 'shawn',
          isComplete: false,
          isEdit : false
        }
      ]
    }

    this.addTodoHandler = this.addTodoHandler.bind(this);    
    this.editingTodoHandler = this.editingTodoHandler.bind(this);
    
  }

  // add
  addTodoHandler(e){
    if(e.charCode !== 13){
      return;
    }
    this.setState({
      message : [
        ...this.state.message,
        {
          id : uuidv4(),
          text : e.target.value,
          isComplete : false,
          isEdit : false
        }
      ]
    })
    e.target.value="";
  }

  // delete
  removeTodoHandler(id){

    const newState = this.state.message.filter((todo) => {
      if(todo.id !== id){
        return todo;
      }else{
        return false;
      }
    });

    this.setState({
      message : newState
    })
  }

  // edit
  editTodoHandler(id){
    
    const newState = this.state.message.map((todo)=>{
      if(todo.id === id){
        todo.isEdit = true;
      } 
      return todo;
    });

    this.setState({
      message : newState
    })
  }

  // editing
  editingTodoHandler(e , id){

    const newState = this.state.message.map((todo) =>{
      if(todo.id === id){
        todo.text = e.target.value;
      }
      return todo;
    })

    this.setState({
      message : newState
    })
  }

  // ok
  okTodoHandler(e,id){
    const newState = this.state.message.map((todo) =>{
      if((e.type === "click" && todo.id === id) ||
        (e.type === "keypress" && todo.id === id && e.charCode === 13)
      ){
        todo.isEdit = false;
      }
      return todo;
    })

    this.setState({
      message : newState
    })
  }


  render() {
    
    return (
      <div>
        <input type="text" 
        placeholder="what to do!!"
        onKeyPress={this.addTodoHandler} />
        {
          this.state.message.map((todo) => 
                        <div className="list_todo" key={todo.id}> 
                          {
                            todo.isEdit? 
                            <input type="text" value={todo.text} onKeyPress={(e) => this.okTodoHandler(e,todo.id)} onChange={(e) => this.editingTodoHandler(e,todo.id)} /> 
                            : <label style={this.doneStyle}><input type="checkbox" /> {todo.text}</label>
                          }
                          {
                            todo.isEdit?
                            <button onClick={(e) => this.okTodoHandler(e,todo.id)}>ok</button>    
                            : <button onClick={() => this.editTodoHandler(todo.id)}>edit</button>  
                          }
                          <button onClick={() => this.removeTodoHandler(todo.id)}>x</button>
                          
                        </div> 
            )
        }
      </div>
     
    );
  }
}

export default App;
