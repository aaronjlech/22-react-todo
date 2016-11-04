const React = require('react')
const ReactDOM = require('react-dom')
const Backbone = require('backbone')

const HomeView = React.createClass({

   getInitialState: function(){

      return {
         allItems: [],
      }
   },

   componentWillMount: function(){


      var self = this
      Backbone.Events.on('change-if-done',function(checkedId, status){

         let copyOfItems = self.state.allItems.map((copy) => {return copy})

         copyOfItems[checkedId].isDone = status

         self.setState({allItems: copyOfItems})

      })

   },

   _addNewTask: function(evt){

      if(evt.keyCode === 13){
         let newTitle = evt.target.value

         let newId = this.state.allItems.length
         let copyOfArray = this.state.allItems
         copyOfArray.push({tasktitle: newTitle, isDone: false, taskId: newId})
         console.log()

         evt.target.value = ''

         let newTask = {allItems: copyOfArray, }

         return this.setState(newTask)
      }
   },

   _changeStateOfTask: function(){




   },

   _removeItems: function(evt){

      this.state.allItems.filter(function(){


         
      })

   },

   render: function(){
      console.log(this.state)
      let createListing = this.state.allItems.map(function(itemObj, i){


           return <NewToDoList itemData={itemObj} key = {i} />
        })
      return(
         <div className="todo-container">
            <input type="text" className="add-todo" onKeyDown={this._addNewTask}/>
               <ul className="todo-list">
               {createListing}
               </ul>
            <button className="btn btn-primary remove-tasks" onClick={this._removeItems}>Remove Items from task list</button>
         </div>
      )
   }
})

const NewToDoList = React.createClass({

   _setDone: function(evt){
      console.log(evt.target.checked)
      console.log(this.props.itemData.taskId)
      let isChecked = evt.target.checked
      let taskNum = this.props.itemData.taskId

      this.props.itemData.isDone = evt.target.checked

      Backbone.Events.trigger("change-if-done", taskNum, isChecked )



   },



   render: function(){
      return (
         <li className="todo-item">
            <p>{this.props.itemData.tasktitle}</p>
            <input type="checkbox" className="task-checkbox" onClick={this._setDone} />
         </li>


      )
   }


})

// NAV ITEMS
// <ul className="nav nav-tabs todo-nav">
//    <li role="presentation" className="active todo-tab-active"><a href="#">all</a></li>
//    <li role="presentation"><a href="#">h</a></li>
//    <li role="presentation"><a href="#">undone</a></li>
// </ul>
// TO DO ITEMS ****




// Backbone.Events.on('change-event-status', function(id, arg2, arg3){
//
//
//
//
// })
ReactDOM.render(<HomeView/>, document.querySelector('#app-container'))


// Backbobe.Events.trigger('change-event-status', objId, arg2, arg3)
