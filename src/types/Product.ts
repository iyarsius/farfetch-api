export interface IProduct {
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
}

export interface IProductDetails {
  description: string;
  categories: ICategory[];
  variants: IVariant[];
  season: ISeason;
  measurements: any[]; // Assuming measurements can be of any type
  compositions: IComposition[];
  brandStyleId: string;
  care: ICare[];
  colors: IColor[];
  isOnline: boolean;
  hasParentProduct: boolean;
  parentProductId: number;
  preferedMerchantId: number;
  madeIn: string;
  preferedMerchant: IPreferedMerchant;
  styleId: number;
  scaleId: number;
  customization: ICustomization;
  labels: ILabel[];
  isObsolete: boolean;
  fitting: IFitting[];
  sizeGuide: ISizeGuide;
}

export interface ICategory {
  id: number;
  name: string;
  parentId: number;
  gender: string;
  uuid: string;
}

export interface IVariant {
  merchantId: number;
  attributes: IAttribute[];
  price: IPrice;
  quantity: number;
  availableAt: number[];
  purchaseChannel: string;
  measurements: any[]; // Assuming measurements can be of any type
  id: string;
  barcodes: string[];
  sku: string;
  publicationFeatures: IPublicationFeature[];
}

export interface IAttribute {
  type: string;
  value: string;
}

export interface IPrice {
  currencyIsoCode: string;
  countryId: number;
  promotions: IPromotion[];
  priceExclTaxes: number;
  priceInclTaxes: number;
  discountExclTaxes: number;
  discountInclTaxes: number;
  discountRate: number;
  taxesRate: number;
  taxesValue: number;
  tags: string[];
  priceWithoutPromotion: number;
}

export interface IPromotion {
  id: string;
  displayName: string;
}

export interface IPublicationFeature {
  code: string;
}

export interface IImages {
  images: IImage[];
  liveModel: ILiveModel;
  productSize: string;
}

export interface IImage {
  order: number;
  size: string;
  url: string;
}

export interface ILiveModel {
  id: number;
  measurements: IMeasurement[];
  name: string;
  globalId: string;
}

export interface IMeasurement {
  description: string;
  value: number;
  unit: string;
  measureTypeId: string;
  unitClass: string;
}

export interface IBrand {
  id: number;
  name: string;
  description: string;
}

export interface ISeason {
  id: number;
  uuid: string;
  code: string;
}

export interface IComposition {
  productPart: string;
  material: string;
  value: string;
}

export interface ICare {
  instruction: string;
  value: string;
}

export interface IColor {
  color: {
    id: number;
    name: string;
  };
  tags: string[];
}

export interface IPreferedMerchant {
  merchantId: number;
  byAttribute: IAttribute[];
}

export interface ICustomization {
  customizerSettingsByMerchant: any[]; // Assuming customizer settings can be of any type
}

export interface ILabel {
  id: number;
  name: string;
  priority: number;
}

export interface IFitting {
  type: number;
  description: string;
}

export interface ISizeGuide {
  isBrandedSizeGuide: boolean;
  sizeScaleMaps: ISizeScale[];
};

export interface ISizeScale {
  scale: { id: string, description: string, abbreviation: string };
  sizeValues: ISizeValue[];
};

export interface ISizeValue {
  value: string;
  position: number;
  sizeID: number;
};