import IConfig from '../IConfig';
import Scale from './Scale';
import MinMax from './MinMax';

class Track {
  private track: HTMLElement;

  private scale: Scale;

  private minMax: MinMax;

  constructor(slider: HTMLElement) {
    this.init(slider);
  }

  public update(config: IConfig, halfWidthRunnerR: number, halfWidthRunnerL?: number) {
    const { min, max, minMax } = config;
    this.scale.update(config, halfWidthRunnerR, halfWidthRunnerL);
    this.minMax.update(minMax, min, max, halfWidthRunnerR, halfWidthRunnerL);
  }

  public setOrientation(vertical: boolean) {
    this.scale.setOrientation(vertical);
    this.minMax.setOrientation(vertical);
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
