import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";

const data = gql`
  query {
    fullName
    hello
  }
`;
const PostList = ({ data }) => {
  console.log("data ", data);
  return (
    <div className="container">
      <div>{data.hello}</div>
      <div>{data.fullName}</div>
      <style jsx>{`
        .container > div {
          padding: 15px 0;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default graphql(data)(PostList);
