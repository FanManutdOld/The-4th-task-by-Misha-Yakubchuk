import IConfig from '../IConfig';
import Scale from './Scale';
import Limits from './Limits';

class Track {
  private track: HTMLElement;

  private scale: Scale;

  private limits: Limits;

  constructor(slider: HTMLElement) {
    this.init(slider);
  }

  public update(config: IConfig, halfWidthRunnerRight: number, halfWidthRunnerLeft?: number) {
    const { min, max, hasLimits } = config;
    this.scale.update(config, halfWidthRunnerRight, halfWidthRunnerLeft);
    this.limits.update(hasLimits, min, max, halfWidthRunnerRight, halfWidthRunnerLeft);
  }

  public setOrientation(isVertical: boolean) {
    this.scale.setOrientation(isVertical);
    this.limits.setOrientation(isVertical);
  }

  private init(slider: HTMLElement) {
    this.track = document.createElement('div');
    this.track.className = 'slider__track';
    slider.append(this.track);
    this.scale = new Scale(slider);
    this.limits = new Limits(slider);
  }
}

export default Track;
