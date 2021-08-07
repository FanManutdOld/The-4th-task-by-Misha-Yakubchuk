import CurrentRunner from './ECurrentRunner';

interface IConfig {
  min: number,
  max: number,
  from: number,
  to: number,
  step: number,
  isDouble: boolean,
  hasTips: boolean,
  hasLimits: boolean,
  hasScale: boolean,
  scaleLimit: number,
  isVertical: boolean,
  scin: string,
  current: CurrentRunner,
  onStart?: (data: IConfig) => void;
  onChange?: (data: IConfig) => void;
  onFinish?: (data: IConfig) => void;
}

// eslint-disable-next-line no-undef
export default IConfig;
