class plugin {
  constructor(item) {
    this.init(item);
  }

  init(item) {
    item.style.backgroundColor = "rgba(21,69,225,0.05)";
    item.style.position = "relative";


    let track = document.createElement("div");
    track.style.position = "absolute";
    track.style.width = "100%";
    track.style.height = "10px"
    track.style.top = "30px";
    track.style.boxSizing = "border-box";
    track.style.border = "2px solid gray";
    track.style.borderRadius = "5px";
    track.style.backgroundColor = "rgba(18,243,100,0.5)";
    item.appendChild(track);

    let runner = document.createElement("div");
    runner.style.position = "absolute";
    runner.style.width = "15px";
    runner.style.height = "30px"
    runner.style.top = "20px";
    runner.style.left = "100%";
    runner.style.boxSizing = "border-box";
    runner.style.border = "1px solid black";
    runner.style.borderRadius = "1px";
    runner.style.backgroundColor = "rgba(18,138,243)";
    item.appendChild(runner);

  }
}

export default plugin;