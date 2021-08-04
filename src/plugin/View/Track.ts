import IConfig from '../IConfig';
import Scale from './Scale';
import MinMax from './minMax';

class Track {
  private track: HTMLElement;

  private scale: Scale;

  private minMax: MinMax;

  constructor(slider: HTMLElement) {
    this.init(slider);
  }

  public update(config: IConfig, halfWidthRunnerR: number, halfWidthRunnerL?: number) {
    const { min, max, hasMinMax } = config;
    this.scale.update(config, halfWidthRunnerR, halfWidthRunnerL);
    this.minMax.update(hasMinMax, min, max, halfWidthRunnerR, halfWidthRunnerL);
  }

  public setOrientation(isVertical: boolean) {
    this.scale.setOrientation(isVertical);
    this.minMax.setOrientation(isVertical);
  }

  private init(slider: HTMLElement) {
    this.track = document.createElement('div');
    this.track.className = 'slider__track';
    slider.append(this.track);
    this.scale = new Scale(slider);
    this.minMax = new MinMax(slider);
  }
}

export default Track;
