import { IBrand, ICare, ICategory, IComposition, ICustomization, ILabel, IImages, IPreferedMerchant, IProduct, ISeason, IColor, IVariant, IProductDetails, ISizeGuide, IFitting } from "../types/Product";
import { Farfetch } from "./Client";

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

    description?: string;
    categories?: ICategory[];
    variants?: IVariant[];
    season?: ISeason;
    measurements?: any[]; // Assuming measurements can be of any type
    compositions?: IComposition[];
    brandStyleId?: string;
    care?: ICare[];
    colors?: IColor[];
    isOnline?: boolean;
    hasParentProduct?: boolean;
    parentProductId?: number;
    preferedMerchantId?: number;
    madeIn?: string;
    preferedMerchant?: IPreferedMerchant;
    styleId?: number;
    scaleId?: number;
    customization?: ICustomization;
    labels?: ILabel[];
    isObsolete?: boolean;
    sizeGuide?: ISizeGuide;
    fitting?: IFitting[]

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
            fitting: extraData.data.variation.fitting
        });
    }
}