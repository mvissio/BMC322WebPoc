// Generated by https://quicktype.io

export interface IAwsResponse {
  Name: string;
  Confidence: number;
  Instances: IInstance[];
}

export interface IInstance {
  BoundingBox: IBoundingBox;
  Confidence: number;
}

export interface IBoundingBox {
  Width: number;
  Height: number;
  Left: number;
  Top: number;
}