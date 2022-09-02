import { gql } from "@apollo/client";
// export const GET_WEATHER = gql`
//   query {
//     getCityByName(name: "Gothenburg") {
//       id
//       name
//       country

//       weather {
//         summary {
//           title
//           icon
//         }
//         temperature {
//           actual
//           feelsLike
//           min
//           max
//         }

//         timestamp
//       }
//     }
//   }
// `;
export const GET_WEATHER = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name) {
      id
      name
      country

      weather {
        summary {
          title
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }

        timestamp
      }
    }
  }
`;
