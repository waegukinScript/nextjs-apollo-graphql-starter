import React, { Component } from "react";
import { Query } from "react-apollo";
// import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const allTodosQuery = gql`
  query {
    todos {
      _id
      todo
    }
  }
`;

export const deleteTodoMutation = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(_id: $id) {
      _id
    }
  }
`;

const updateCache = (cache, { data: { deleteTodo } }) => {
  const { todos } = cache.readQuery({ query: allTodosQuery });
  console.log("deleteTodo ", deleteTodo._id);
  cache.writeQuery({
    query: allTodosQuery,
    data: {
      todos: todos.filter(item => item._id !== deleteTodo._id)
    }
  });
};

export default class TodoList extends Component {
  render() {
    return (
      <Query query={allTodosQuery} errorPolicy="all">
        {({ loading, error, data }) => {
          if (error) return <div>Error loading posts</div>;
          if (loading) return <div>Loading</div>;
          console.log("error ", error);
          console.log("data ", data);
          return (
            <section className="py-5 w-50">
              <ul className="list-group">
                {data.todos.length === 0 ? (
                  <li className="list-group-item text-center">
                    List is Empty...
                  </li>
                ) : (
                  data.todos.map((item, index) => (
                    <li className="list-group-item py-2" key={index}>
                      <div className="row mx-0">
                        <span className="col-md-2">{index + 1}. </span>
                        <span className="col-md-6">{item.todo}</span>
                        <span className="col-md-4 text-right">
                          <Mutation
                            mutation={deleteTodoMutation}
                            variables={{ id: item._id }}
                            update={updateCache}
                          >
                            {(deleteTodo, { loading, error }) => (
                              <i
                                onClick={() =>
                                  deleteTodo({ variables: { id: item._id } })
                                }
                                className={`${
                                  loading
                                    ? "fas fa-spinner fa-spin"
                                    : "far fa-times-circle"
                                }`}
                              />
                            )}
                          </Mutation>
                        </span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </section>
          );
        }}
      </Query>
    );
  }
}
