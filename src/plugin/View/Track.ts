class Track {
  track: HTMLElement;

  constructor(slider: HTMLElement, scin: string) {
    this.initTrack(slider, scin);
  }

  private initTrack(slider: HTMLElement, scin: string) {
    this.track = document.createElement('div');
    this.track.className = `slider__track slider__track_${scin}`;
    slider.append(this.track);
  }
}

export default Track;
