class Track {
  private track: HTMLElement;

  private scin: string;

  public vertical: boolean;

  constructor(slider: HTMLElement, scin: string) {
    this.initTrack(slider, scin);
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.track.className = vertical
      ? `slider__track slider__track_${this.scin}_vertical`
      : `slider__track slider__track_${this.scin}_horizontal`;
  }

  private initTrack(slider: HTMLElement, scin: string) {
    this.track = document.createElement('div');
    this.scin = scin;
    slider.append(this.track);
  }
}

export default Track;
