const songs = [
  {
    title: "Dreams",
    artist: "Alex Carter",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Sunset Drive",
    artist: "Mia Rose",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Night Sky",
    artist: "Daniel Ray",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = `Artist: ${song.artist}`;
  audio.src = song.src;

  document.querySelectorAll("#playlist li").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;

    const currentMin = Math.floor(audio.currentTime / 60);
    const currentSec = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");

    const totalMin = Math.floor(audio.duration / 60);
    const totalSec = Math.floor(audio.duration % 60).toString().padStart(2, "0");

    duration.textContent = `${currentMin}:${currentSec} / ${totalMin}:${totalSec}`;
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songIndex);
    playSong();
  });
  playlist.appendChild(li);
});

loadSong(songIndex);
