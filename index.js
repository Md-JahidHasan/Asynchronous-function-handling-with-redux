const { createStore, applyMiddleware } = require("redux");
const { delayActionMiddleware, fetchTodoMiddleware } = require("./middleware");

// initial State
const initialState = {
    todos:[]
};

// reducer
const todoReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'todos/todoAdded':
            return {
                ...state,
                todos:[
                    ...state.todos,
                    {
                        title: action.payload
                    }
                ]
            }

        case 'todos/todoLoaded':
            return {
                ...state,
                todos: [
                    ...state.todos, ...action.payload
                ]
            }
        default:
            break;
    }
}

// create store
const store = createStore(todoReducer, applyMiddleware(delayActionMiddleware, fetchTodoMiddleware));

// subscribe store 
store.subscribe(()=>{
    console.log(store.getState());
})

// dispatch actions 
// store.dispatch({
//     type:'todos/todoAdded',
//     payload: 'Learn Redus with LWS'
// })

store.dispatch({
    type:'todos/fetchTodo'
})