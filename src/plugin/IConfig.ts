interface IConfig {
  min: number,
  max: number,
  from: number,
  to: number,
  step: number,
  double: boolean,
  tips: boolean,
  minMax: boolean,
  vertical: boolean,
  scin: string,
  current: string,
  onStart?: (data: IConfig) => void;
  onChange?: (data: IConfig) => void;
  onFinish?: (data: IConfig) => void;
}

// eslint-disable-next-line no-undef
export default IConfig;
