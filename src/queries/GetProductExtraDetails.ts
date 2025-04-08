export const query = `query GetProductExtraDetails($pid: ID!, $countryCodes: [String!]!) {
  product(id: $pid) {
    __typename
    ... on Product {
      sizeGuide {
        isBrandedSizeGuide
        sizeScaleMaps(filter: { countryCodes: $countryCodes }) {
          scale {
              id
              description
              abbreviation
          }
          sizeValues {
            position
            sizeId
            value
          }
        }
      }
    }
  }
  variation(productId: $pid) {
    __typename
    ... on Variation {
      fitting {
        type
        description
      }
      returnDetail {
        restrictions
      }
    }
  }
}`