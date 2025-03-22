export const query = `query GetRecommendedProductCatalog($styleID: ID!, $pid: ID!) {
  myRecommendedProductCatalog(
    recommendedInput: {
      strategyType: SAME_COLLECTION
      viewType: PRODUCT_DETAILS
    }
    input: {
      filter: {
        exclusiveProducts: false
        styles: [$styleID]
      }
      negativeFilter: {
        products: [$pid]
      }
      sortFilter: {
        option: RANKING
        order: ASC
      }
    }
    first: 20
  ) {
    __typename
    ... on RecommendedProductCatalogConnection {
      edges {
        node {
          id
        }
      }
    }
  }
}`