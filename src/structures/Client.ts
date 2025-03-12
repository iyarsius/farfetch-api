import { IAuthToken, IFarfetchOptions, IGetPageParams, ISearchParams } from "../types/Client";
import { Product } from "./Product";
import { query } from "../queries/GetProductExtraDetails";

export class Farfetch {
    countryCode: string;
    currencyCode: string;
    authToken: IAuthToken;

    constructor(options: IFarfetchOptions) {
        this.countryCode = options.countryCode;
        this.authToken = options.authToken;
        this.currencyCode = options.currencyCode;
    };

    async _formatData(data: Response) {
        if (data.status !== 200) throw new Error(`Error ${data.status}: ${data.statusText}`, {
            cause: await data.json()
        });

        return await data.json() as any;
    };

    _getHeaders() {
        return {
            authorization: this.authToken.token_type + " " + this.authToken.access_token,
            "ff-currency": this.currencyCode,
            "ff-country": this.countryCode,
            "accept-language": `${this.countryCode}-${this.countryCode.toUpperCase()}`
        };
    };

    protected async _fetchExtraData(id: number) {
        return await fetch("https://marketplace.farfetch.net/graphql", {
            method: "POST",
            headers: {
                ...this._getHeaders(),
                "x-request-operation-name": "pdpProduct",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    pid: id,
                    countryCodes: [this.countryCode]
                }
            })
        }).then(this._formatData);
    };

    async connect() {
        this.authToken = await fetch('https://auth.farfetch.net/connect/token', {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "GuestUser",
                client_id: "19AB83A37D804711ACDBCFA643FE435D",
                scope: "api"
            }),
        }).then(this._formatData);
    }

    async search(query: string, params?: ISearchParams): Promise<Product[]> {
        const queryParams = new URLSearchParams({
            q: query,
            page: params?.page || '1',
            sort: params?.sort || 'ranking',
            imagesSizes: params?.imagesSizes || "1920",
            pageSize: params?.pageSize || "10",
            fields: 'id,shortDescription,images,brand,gender,departmentId,isCustomizable,type,uploadedDate,tag,hasSimilarProducts'
        });

        const data = await fetch(`https://api.farfetch.net/v1/search/products?${queryParams}`, {
            headers: this._getHeaders(),
            signal: params?.abortSignal
        }).then(this._formatData);

        // to ensure compatibility with details format
        data.products.entries.map((p, i) => data.products.entries[i].images = { images: p.images });

        return data.products.entries.map(p => new Product(this, p));
    };

    async get(identifier: string | number, params?: IGetPageParams) {
        const terms = await fetch(`https://api.farfetch.net/v1/search/stopwords?searchTerms=${identifier}`, {
            headers: this._getHeaders(),
            signal: params?.abortSignal
        }).then(this._formatData);

        const term = terms[0];
        if (term?.type !== "Id") throw new Error("Invalid identifier");

        const [data, extraData] = await Promise.all([
            fetch(`https://api.farfetch.net/v1/products/${term.value}`, {
                headers: this._getHeaders(),
                signal: params?.abortSignal
            }).then(this._formatData),
            this._fetchExtraData(term.value)
        ]);

        // so the product look alrady fetched
        data.fetched = true;

        return new Product(this, {
            ...data,
            sizeGuide: extraData.data.product.sizeGuide,
            fitting: extraData.data.variation.fitting
        })
    };
}