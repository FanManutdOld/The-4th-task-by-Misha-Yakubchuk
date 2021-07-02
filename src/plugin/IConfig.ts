// eslint-disable-next-line no-unused-vars
import CurrentRunner from './ECurrentRunner';

interface IConfig {
  min: number,
  max: number,
  from: number,
  to: number,
  step: number,
  scaleNum: number,
  double: boolean,
  tips: boolean,
  minMax: boolean,
  scale: boolean,
  scaleSnap: boolean,
  scaleLimit: number,
  vertical: boolean,
  scin: string,
  current: CurrentRunner,
  onStart?: (data: IConfig) => void;
  onChange?: (data: IConfig) => void;
  onFinish?: (data: IConfig) => void;
}

// eslint-disable-next-line no-undef
export default IConfig;
