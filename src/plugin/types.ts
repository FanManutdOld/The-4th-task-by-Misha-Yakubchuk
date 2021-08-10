declare global {
  interface JQuery {
    mySlider: (config?: MySliderConfig) => JQuery;
    data(key: 'mySlider'): MySliderAPI;
  }
  type MySliderAPI = {
    getData: () => MySliderConfig;
    update: (config?: MySliderConfig) => void;
  };
}

enum CurrentRunner {
  FROM = 'from',
  TO = 'to',
}

type MySliderConfig = {
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  step?: number;
  isDouble?: boolean;
  hasTips?: boolean;
  hasLimits?: boolean;
  hasScale?: boolean;
  scaleLimit?: number;
  isVertical?: boolean;
  scin?: string;
  current?: CurrentRunner;
  onStart?: (data: MySliderConfig) => void;
  onChange?: (data: MySliderConfig) => void;
  onFinish?: (data: MySliderConfig) => void;
};

// eslint-disable-next-line no-undef
export { MySliderConfig, CurrentRunner };
