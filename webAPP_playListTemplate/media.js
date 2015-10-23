function media(title, duration) {
  this.title = title;
  this.duration = duration;
  this.isPlaying = false;
}

media.prototype.play = function() {
  this.isPlaying = true;
};

media.prototype.stop = function() {
  this.isPlaying = false;
};