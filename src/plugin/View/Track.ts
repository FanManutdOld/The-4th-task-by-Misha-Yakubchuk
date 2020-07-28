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
      ? `s__track s__track_${this.scin} s__track_${this.scin}_ver`
      : `s__track s__track_${this.scin} s__track_${this.scin}_hor`;
  }

  private initTrack(slider: HTMLElement, scin: string) {
    this.track = document.createElement('div');
    this.scin = scin;
    slider.append(this.track);
  }
}

export default Track;
