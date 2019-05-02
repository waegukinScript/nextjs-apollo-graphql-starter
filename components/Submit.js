import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { allTodosQuery } from "./Todos";
import { graphql } from "react-apollo";

export default function Submit() {
  return (
    <ApolloConsumer>
      {client => (
        <form onSubmit={event => handleSubmit(event, client)}>
          <h1 className="display-5 pb-3">Create New Task</h1>
          <div className="form-group">
            <input
              className="form-control d-inline-block w-50 align-middle"
              placeholder="add todo"
              name="todo"
              type="text"
            />
            <button className="btn btn-primary ml-4" type="submit">
              Add Task
            </button>
          </div>
        </form>
      )}
    </ApolloConsumer>
  );
}

function handleSubmit(event, client) {
  event.preventDefault();
  const form = event.target;
  const formData = new window.FormData(form);
  const todo = formData.get("todo");
  console.log("user input from Submit.js ", todo);
  form.reset();

  client.mutate({
    mutation: gql`
      mutation createTodo($todo: String!) {
        createTodo(userInput: { todo: $todo }) {
          _id
          todo
        }
      }
    `,
    variables: { todo },
    update: (proxy, { data: { createTodo } }) => {
      const data = proxy.readQuery({
        query: allTodosQuery
      });
      proxy.writeQuery({
        query: allTodosQuery,
        data: {
          // ...data,
          todos: [...data.todos, createTodo]
        }
      });
    }
  });
}
