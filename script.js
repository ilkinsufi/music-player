let album_art = document.querySelector(".album-art");
let song_name = document.querySelector(".song-name");
let artist = document.querySelector(".artist");

let seek_slider = document.querySelector(".seek_slider");

let prevBtn = document.querySelector(".prev");
let playBtn = document.querySelector(".fa-play");
let pauseBtn = document.querySelector(".fa-pause");
let nextBtn = document.querySelector(".next");

let lowVolBtn = document.querySelector(".low");
let volumeSlider = document.querySelector(".volume_slider");
let highVolBtn = document.querySelector(".high");

let curr_track = document.querySelector(".audio");

let startSong = document.querySelector(".startSong");
let endSong = document.querySelector(".endSong");

let track_index = 0;
let isPlaying = false;
let updateTimer;

const music_list = [
  {
    img: "./meddle.jpeg",
    name: "Yok Sana Tamam",
    artist: "Rody Dünyada",
    music: "./yok-sana-tamam.mp3",
  },
  {
    img: "./the-final-cut.jpg",
    name: "Türkü",
    artist: "Rody Dünyada",
    music: "./türkü.mp3",
  },
  {
    img: "./the-wall.jpg",
    name: "Raylar",
    artist: "Pink Floyd",
    music: "./raylar.mp3",
  },
];

let audio = new Audio(music_list[track_index].music);

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);

  audio.src = music_list[track_index].music;
  audio.load();

  album_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  song_name.textContent = music_list[track_index].name;
  artist.textContent = music_list[track_index].artist;

  updateTimer = setInterval(setUpdate, 1000);

  audio.addEventListener("ended", nextTrack);
  setTimeout(() => {
    endSong.textContent = formatTime(audio.duration);
  }, 100);

  function songStartPoint() {
    audio.addEventListener("timeupdate", () => {
      let minute = Math.floor(audio.currentTime / 60);
      let seconds = Math.floor(audio.currentTime % 60);
      startSong.textContent = `0${minute}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
      startSong.textContent = `${Math.floor(
        audio.currentTime / 60
      )}:${Math.floor(audio.currentTime % 60)}`;
      let qalanVaxt = audio.duration - audio.currentTime;
      endSong.textContent = `${formatTime(qalanVaxt)}`;
    });
  }

  songStartPoint();
}

// endSong start
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0` + min;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0` + sec;
  }

  return `${min} : ${sec}`;
};
// endSond end

function playTrack() {
  audio.play();
  isPlaying = true;
  pauseBtn.style.display = "block";
  playBtn.style.display = "none";
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  pauseBtn.style.display = "none";
  playBtn.style.display = "block";
}

// function stopTrack() {
//   audio.pause();
//   audio.currentTime = 0;
//   isPlaying = false;
//   pauseBtn.style.display = "none";
//   playBtn.style.display = "block";
// }

function setVolume() {
  let volume = volumeSlider.value / 100;
  audio.volume = volume;
}

function playpausetrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function nextTrack() {
  track_index++;
  if (track_index > music_list.length - 1) {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prewTrack() {
  track_index--;
  if (track_index < 0) {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = audio.duration * (seek_slider.value / 100);
  audio.currentTime = seekto;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);
    seek_slider.value = seekPosition;
  }
}

function setVolume() {
  let volume = volumeSlider.value / 100;
  audio.volume = volume;
}
// seeking
seek_slider.addEventListener("input", function () {
  let seekto = audio.duration * (seek_slider.value / 100);
  audio.currentTime = seekto;
});

// mahnı dəyişmə düymələri
prevBtn.addEventListener("click", function () {
  track_index--;
  if (track_index < 0) {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
});

// play_pauseBtn.addEventListener("click", function () {
//   isPlaying ? pauseTrack() : playTrack();
// });

nextBtn.addEventListener("click", function () {
  track_index++;
  if (track_index > music_list.length - 1) {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
});
