import { IBrand, ICare, ICategory, IComposition, ICustomization, ILabel, IImages, IPreferedMerchant, IProduct, ISeason, IColor, IVariant, IProductDetails, ISizeGuide, IFitting } from "../types/Product";
import { Farfetch } from "./Client";
import { query } from "../queries/GetRecommendedProductCatalog";

export class Product implements IProduct {
    id: number;
    shortDescription: string;
    images: IImages;
    brand: IBrand;
    gender: string;
    departmentId: string;
    isCustomizable: boolean;
    type: string;
    uploadedDate: string;
    tag: string;
    hasSimilarProducts?: boolean;

    measurements: any[] = []; // Assuming measurements can be of any type
    compositions: IComposition[] = [];
    categories: ICategory[] = [];
    variants: IVariant[] = [];
    care: ICare[] = [];
    colors: IColor[] = [];
    labels: ILabel[] = [];
    fitting: IFitting[] = [];

    description?: string;
    season?: ISeason;
    brandStyleId?: string;
    isOnline?: boolean;
    hasParentProduct?: boolean;
    parentProductId?: number;
    preferedMerchantId?: number;
    madeIn?: string;
    preferedMerchant?: IPreferedMerchant;
    styleId?: number;
    scaleId?: number;
    customization?: ICustomization;
    isObsolete?: boolean;
    sizeGuide?: ISizeGuide;

    protected fetched = false;

    constructor(public client: Farfetch, data: IProduct) {
        Object.assign(this, data);
    };

    isFetched(): this is IProduct & IProductDetails {
        return this.fetched;
    };

    async fetchDetails() {
        const data = await fetch(`https://api.farfetch.net/v1/products/${this.id}`, {
            headers: this.client._getHeaders()
        }).then(this.client._formatData);

        // ignore the "protected" keyword for method
        const extraData = await (this.client as any)._fetchExtraData(this.id);

        Object.assign(this, {
            ...data,
            sizeGuide: extraData.data.product.sizeGuide,
            fitting: extraData.data.variation.fitting || []
        });
    };

    async getVariations(): Promise<Product[]> {
        const data = await fetch(`https://marketplace.farfetch.net/graphql`, {
            method: "POST",
            headers: {
                ...this.client._getHeaders(),
                "x-request-operation-name": "myRecommendedProductCatalog",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    styleID: this.styleId,
                    pid: this.id
                }
            })
        }).then(this.client._formatData);

        const variationsIDs = data.data.myRecommendedProductCatalog.edges.map((edge: any) => edge.node.id);
        return await Promise.all( variationsIDs.map((id: string) => this.client.get(id)));
    }
}