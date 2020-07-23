class Track {
  constructor(slider, scin) {
    this.initTrack(slider, scin);
  }

  initTrack(slider, scin) {
    this.track = document.createElement('div');
    this.track.className = `slider__track slider__track_${scin}`;
    slider.appendChild(this.track);
  }
}

export default Track;
