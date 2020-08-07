class Track {
  private track: HTMLElement;

  constructor(slider: HTMLElement) {
    this.initTrack(slider);
  }

  private initTrack(slider: HTMLElement) {
    this.track = document.createElement('div');
    this.track.className = 'slider__track';
    slider.append(this.track);
  }
}

export default Track;
