// import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { allPositionsQuery } from "./AllPositions";
import { graphql } from "react-apollo";

// export default function Submit() {
//   return (
//     <ApolloConsumer>
//       {client => (
//         <form onSubmit={event => handleSubmit(event, client)}>
//           <h1>Submit</h1>
//           <input placeholder="position" name="position" type="text" required />
//           <button type="submit">Submit</button>
//           <style jsx>{`
//             form {
//               border-bottom: 1px solid #ececec;
//               padding-bottom: 20px;
//               margin-bottom: 20px;
//             }
//             h1 {
//               font-size: 20px;
//             }
//             input {
//               display: block;
//               margin-bottom: 10px;
//             }
//           `}</style>
//         </form>
//       )}
//     </ApolloConsumer>
//   );
// }

const Submit = ({ createPosition }) => {
  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new window.FormData(form);
    createPosition(formData.get("position"));
    form.reset();
  };
  return (
    <form onSubmit={e => this.handleSubmit(e)}>
      <h1>Submit</h1>
      <input placeholder="position" name="position" type="text" required />
      <button type="submit">Submit</button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  );
};

const createPosition = gql`
  mutation createPosition($position: String!) {
    createPosition(userInput: { position: $position }) {
      _id
      position
    }
  }
`;

export default graphql(createPosition, {
  props: ({ mutate }) => ({
    createPost: position =>
      mutate({
        variables: { position },
        update: (proxy, { data: { createPosition } }) => {
          const data = proxy.readQuery({
            query: allPositionsQuery
          });
          proxy.writeQuery({
            query: allPositionsQuery,
            data: {
              ...data,
              allPositionsQuery: [createPosition, ...data.positions]
            }
          });
        }
      })
  })
})(Submit);

// function handleSubmit(event, client) {
//   event.preventDefault();
//   const form = event.target;
//   const formData = new window.FormData(form);
//   const position = formData.get("position");
//   console.log("input ", position);
//   form.reset();

//   client.mutate({
//     mutation: gql`
//       mutation createPosition($position: String!) {
//         createPosition(userInput: { position: $position }) {
//           _id
//           position
//         }
//       }
//     `,
//     variables: { position },
//     update: (proxy, { data: { createPosition } }) => {
//       const data = proxy.readQuery({
//         query: allPositionsQuery
//       });
//       proxy.writeQuery({
//         query: allPositionsQuery,
//         data: {
//           ...data,
//           allPositionsQuery: [createPosition, ...data.positions]
//         }
//       });
//     }
//   });
// }
