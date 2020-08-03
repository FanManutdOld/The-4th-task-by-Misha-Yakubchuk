class Track {
  private track: HTMLElement;

  private vertical: boolean;

  constructor(slider: HTMLElement) {
    this.initTrack(slider);
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
  }

  private initTrack(slider: HTMLElement) {
    this.track = document.createElement('div');
    this.track.className = 'slider__track';
    slider.append(this.track);
  }
}

export default Track;
