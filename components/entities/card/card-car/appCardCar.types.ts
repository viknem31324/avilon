export interface IAppCarParam {
  label: string;
  value: string;
}

export interface IAppCarCard {
  id: number;
  title: string;
  code: string;
  image: string;
  isAccent: boolean;
  params: IAppCarParam[];
  detailLink: string;
}
