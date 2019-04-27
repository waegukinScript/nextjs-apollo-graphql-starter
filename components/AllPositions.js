import { Query } from "react-apollo";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

export const allPositionsQuery = gql`
  query {
    positions {
      position
    }
  }
`;

const Position = ({ position }) => (
  <div>
    <div className="item">{position.position}</div>
    <style jsx>{`
      div.item {
        padding: 3px 0;
        border: 1px solid #ddd;
        margin: 5px 0;
      }
    `}</style>
  </div>
);

const PostList = ({ data }) => {
  const { error, positions } = data;
  if (error) {
    return <div>error</div>;
  }
  if (positions && positions.length) {
    return (
      <section>
        <div>
          {positions.map((position, i) => (
            <Position key={i} position={position} />
          ))}
        </div>
      </section>
    );
  }
  return <div>Loading...</div>;
};

// const PostList = ({ data }) => {
//   console.log("allPositionsQuery ", data);
//   return (
//     <Query query={allPositionsQuery}>
//       <div className="container">
//         <div>
//           {data &&
//             data.positions.map((item, i) => (
//               <div className="list" key={i}>
//                 {item.position}
//               </div>
//             ))}
//         </div>
//         {/* <div>{data.fullName}</div> */}
//         <style jsx>{`
//           .container > div {
//             padding: 15px 0;
//             font-weight: bold;
//           }
//           .list {
//             padding: 10px 0;
//           }
//         `}</style>
//       </div>
//     </Query>
//   );
// };

export default graphql(allPositionsQuery)(PostList);
