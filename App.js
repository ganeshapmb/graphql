import React,{useState} from "react";
import { ApolloProvider,useQuery,useMutation,gql } from "@apollo/client";
import client from "./ApolloClient";

const GET_TODOS = gql`
  query GetTodos{
    todos {
      id
      title
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($title:String!){
    createTodo(title:$title){
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id:ID!,$title:String,$completed:Boolean){
    updateTodo(id:$id,title:$title,completed:$completed){
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id:ID!){
    deleteTodo(id:$id)
  }
`;

const Todos = () =>{
  const {loading,error,data}= useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO)
  const [updateTodo] = useMutation(UPDATE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [title, setTitle] = useState('')

  if(loading) return <p>loading...</p>;
  if(error) return <p>Error:</p>;

  const handleCreateTodo=()=>{
    createTodo({
      variables:{title},
      refetchQueries:[{query:GET_TODOS}],
    });
    setTitle('');
  };

  const handleUpdateTodo=(id,title,completed)=>{
    updateTodo({
      variables:{id,title,completed},
      refetchQueries:[{query:GET_TODOS}],
    });
  };

  const handleDeleteTodo=(id)=>{
    deleteTodo({
      variables:{id},
      refetchQueries:[{query:GET_TODOS}],
    });
  };

  const handleChange = (e)=>{
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    }
  }

  return (
  <div>
    <input type="text" value={title} onChange={handleChange} id="title" name="title" placeholder="Add new Todo"/>
    <button onClick={handleCreateTodo}>Add Toddo</button>
    <ul>
        {data.todos.map(({ id, title, completed }) => (
          <li key={id}>
            <input
              type="text"
              value={title}
              onChange={(e) => handleUpdateTodo(id, e.target.value, completed)}
            />
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => handleUpdateTodo(id, title, e.target.checked)}
            />
            <button onClick={() => handleDeleteTodo(id)}>Delete</button>
          </li>
        ))}
      </ul>
  </div>
  );

}


const App = ()=>(
  <ApolloProvider client={client}>
    <div>
      <h2>My TodoList</h2>
      <Todos />
    </div>
  </ApolloProvider>
);




export default App;
