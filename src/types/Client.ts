export interface IFarfetchOptions {
    countryCode: string;
    currencyCode: string;
    authToken?: IAuthToken,
}

export interface IAuthToken {
    access_token: string,
    expires_in: number,
    token_type: string,
    scope: string
}

export interface ISearchParams {
    page: string,
    sort: string,
    imagesSizes: "300" | "500" | "600" | "700" | "800" | "1000" | "1920" | "2048",
    pageSize: string,
    abortSignal?: AbortSignal
}

export interface IGetPageParams {
    abortSignal?: AbortSignal
}