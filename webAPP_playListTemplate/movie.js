function movie(title, year, duration) {
  var movie = this;
  media.call(movie,title,duration);
  this.year = year;
}

movie.prototype = Object.create(media.prototype);

movie.prototype.toHTML = function() {
  var htmlString = '<li ';
  if (this.isPlaying) {
    htmlString+= 'class="current"';
  }
  htmlString+= '>';
  htmlString+=  this.title;
  htmlString+= ' (';
  htmlString+= this.year;
  htmlString+= ')';
  htmlString+= '<span class="duration">';
  htmlString+= this.duration;
  htmlString+= '</span></li>';
  return htmlString;
};