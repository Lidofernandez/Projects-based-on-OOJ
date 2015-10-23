function Song(title, artist, duration) {
  var song = this;
  media.call(song,title,duration);
  this.artist = artist;
}

Song.prototype = Object.create(media.prototype);

Song.prototype.toHTML = function() {
  var htmlString = '<li ';
  if (this.isPlaying) {
    htmlString+= 'class="current"';
  }
  htmlString+= '>';
  htmlString+=  this.title;
  htmlString+= '-';
  htmlString+= this.artist;
  htmlString+= '<span class="duration">';
  htmlString+= this.duration;
  htmlString+= '</span></li>';
  return htmlString;
};