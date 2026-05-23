console.log('js linked');

let songs = [
  {
    link: `https://i.scdn.co/image/ab67616d00001e0212d5de3d8e314957260010a8`,
    title: `Majboor`,
    artist: `Sheheryar Rehan, Zoha Waseem`,
    src: `songs/song1.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02c25b53f0a34aa1bb4f77cb3e`,
    title: `drop dead`,
    artist: `Olivia Rodrigo`,
    src: `songs/song2.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02ddbbd19c853dffcc23e894ff`,
    title: `Chand Mera Dil - Title Track`,
    artist: `Sachin-Jigar, Faheem Abdullah, Amitabh Bhattacharya`,
    src: `songs/song3.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02391478367725de02c678a358`,
    title: `Moves`,
    artist: `Shubh`,
    src: `songs/song4.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02530e627d6b4aced65e1ccf4a`,
    title: `Amsham`,
    artist: `Aksomaniac, M.H.R, Bhumi, Circle Tone`,
    src: `songs/song5.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02ef8b82436833330bf4f0370a`,
    title: `Jab Talak-From "Cocktail 2"`,
    artist: `Pritam, Arijit Singh, Amitabh Bhattacharya, Madhubanti Bagchi, AKASA`,
    src: `songs/song6.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02cdc5d305c537648861945f0a`,
    title: `Side Effects`,
    artist: `ZAYN`,
    src: `songs/song7.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02f1d02a6cec967f8b6b78f76e`,
    title: `Beauty And A Beat`,
    artist: `Justin Bieber, Nicki Minaj`,
    src: `songs/song8.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02dadf0001aead5dc339db2755`,
    title: `Ishq de Fanniyar - Female Version`,
    artist: `Jyotica Tangri, Kumaar`,
    src: `songs/song9.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02dfc0fef29ebd7794f2ffe4f6`,
    title: `VOGUE`,
    artist: `Guru Randhawa, Gill Machhrai, Roni Ajnali, Dilmaan`,
    src: `songs/song10.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e024ade1e2fcb26233f85c98ac4`,
    title: `Kya Kamaal Hai (From "Main Vaapas Aaunga")`,
    artist: `A.R. Rahman, Diljit Dosanjh, Irshad Kamil`,
    src: `songs/song11.mp3`
  },
  {
    link: `https://i.scdn.co/image/ab67616d00001e02d14da7da1e7275137a55a201`,
    title: `License Ka Asla (From "License")`,
    artist: `Masoom Sharma`,
    src: `songs/song12.mp3`
  }
];

let allSongs=[...songs]
document.querySelector('.search').addEventListener('input', function () {
  const q = this.value.trim().toLowerCase();

  if (!q) {
    songs = [...allSongs]; 
  } else {
    songs = allSongs.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q)
    );
  }

  currentIndex = 0;
  isPlaying = false;

  songdisplay();
});

let music_container = document.querySelector(".music-container")
let audio = document.getElementById("audio");



let cards = [];
let currentIndex = 0;
let isPlaying = false;
audio.src = songs[currentIndex].src

let seek_title = document.querySelector(".seektitle")
seek_title.innerHTML = `${songs[currentIndex].title}`

let seek_playpause = document.querySelector(".seek_playpause")
let seek_previous = document.querySelector(".seek_previous")
let seek_next = document.querySelector(".seek_next")




function songdisplay() {

  music_container.innerHTML = "";

  for (let i = 0; i < songs.length; i++) {
    music_container.insertAdjacentHTML("beforeend", `<div class="music-cards" data-index="${i}">
                    <img src=${songs[i].link} alt="">
                    <h4>${songs[i].title}</h4>
                    <p>${songs[i].artist}</p>
                    <button class="green-btn">
  <img src="assets/greenplaybtn.svg">
</button> 
                </div>`)

  }

  cards = document.querySelectorAll(".music-cards")

  attachEvents()

}

document.addEventListener("DOMContentLoaded", () => {
  songdisplay()
  if (window.innerWidth > 500) {
    navmenu.classList.add("display-none")
    toggle_navmenu()
  }
  if (window.innerWidth > 1170) {
    centermenu.classList.add("display-none")
  } else if (window.innerWidth < 1170) {
    document.querySelector(".center-left").classList.toggle("display-none")
  }

});


function attachEvents() {

  cards.forEach(card => {

    let img = card.querySelector(".green-btn img");
    let index = Number(card.dataset.index)

    card.addEventListener("click", () => {


      if (currentIndex === index && isPlaying) {
        audio.pause();
        isPlaying = false
        seek_playpause.src = "assets/play_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"



      } else {
        audio.src = songs[index].src;
        audio.play();
        currentIndex = index
        isPlaying = true;
        seek_playpause.src = "assets/pause_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"

      }

      updateUI();

    })

    card.addEventListener("mouseenter", () => {
      if (currentIndex === index && isPlaying) {
        img.src = "assets/greenpausebtn.svg";
      } else {
        img.src = "assets/greenplaybtn.svg";
      }
    })

    card.addEventListener("mouseleave", () => {
      updateUI()
    })

  });
}


function updateUI() {

  cards.forEach(card => {

    let img = card.querySelector(".green-btn img");
    let index = Number(card.dataset.index)



    if (currentIndex === index && isPlaying) {
      img.src = "assets/greenpausebtn.svg";
      card.classList.add("change-border-color");

      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });

    } else {
      img.src = "assets/greenplaybtn.svg";
      card.classList.remove("change-border-color");
    }

    seek_title.innerHTML = `${songs[currentIndex].title}`

  }
  );
}

function update() {

  cards.forEach(card => {

    let img = card.querySelector(".green-btn img");
    let index = Number(card.dataset.index)



    if (currentIndex === index && isPlaying) {
      img.src = "assets/greenpausebtn.svg";

    } else {
      img.src = "assets/greenplaybtn.svg";
    }


  }
  );
}


let currentTime
let duration

let time = document.querySelector(".time")

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);


  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  return `${mins}:${secs}`;
}



audio.addEventListener("timeupdate", () => {
  if (isDragging) return
  currentTime = formatTime(audio.currentTime);
  duration = formatTime(audio.duration);
  time.innerHTML = `${currentTime}/${duration}`

  let percent = (audio.currentTime / audio.duration) * 100;
  seek_circle.style.left = percent + "%";
  progressbar.style.width = percent + "%"

});

let seek_circle = document.querySelector(".seekcircle")
let progressbar = document.querySelector(".progressbar")
let seek_line = document.querySelector(".seekline")





seek_line.addEventListener("click", e => {

  if (isNaN(audio.duration)) {
    return
  }
  let rect = seek_line.getBoundingClientRect()
  let percent = (e.clientX - rect.left) / rect.width

  percent = Math.max(0, Math.min(1, percent))

  audio.currentTime = percent * audio.duration

});

function playpause() {
  if (audio.paused) {
    audio.play()
    isPlaying = true
    seek_playpause.src = "assets/pause_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"



  } else {
    audio.pause()
    isPlaying = false
    seek_playpause.src = "assets/play_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"

  }
  update()
}

seek_playpause.addEventListener("click", playpause)

function next() {
  currentIndex++
  if (currentIndex >= songs.length) {
    currentIndex = 0
  }

  audio.src = songs[currentIndex].src;
  audio.play()
  isPlaying = true
  seek_title.innerHTML = `${songs[currentIndex].title}`
  seek_playpause.src = "assets/pause_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
  updateUI()
}

seek_next.addEventListener("click", next)

function previous() {
  currentIndex--
  if (currentIndex < 0) {
    currentIndex = songs.length - 1
  }

  audio.src = songs[currentIndex].src;
  audio.play()
  isPlaying = true
  seek_title.innerHTML = `${songs[currentIndex].title}`
  seek_playpause.src = "assets/pause_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
  updateUI()
}

seek_previous.addEventListener("click", previous)


document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    next()
  }
  else if (e.key === "ArrowLeft") {
    previous()
  }
  else if (e.code === "Space") {
    e.preventDefault()
    playpause()
  }
});

audio.addEventListener("ended", next)


let isDragging = false
let wasPlaying = false
document.body.classList.add("no-select")


function handleDrag(e) {
  if (!audio.duration) return;

  let rect = seek_line.getBoundingClientRect();
  let percent = (e.clientX - rect.left) / rect.width;

  percent = Math.max(0, Math.min(1, percent));

  audio.currentTime = percent * audio.duration;

  let p = percent * 100;
  seek_circle.style.left = p + "%";
  progressbar.style.width = p + "%";
}

seek_line.addEventListener("pointerdown", (e) => {

  e.preventDefault()

  isDragging = true
  wasPlaying = !audio.paused
  audio.pause()

  handleDrag(e)
})

document.addEventListener("pointermove", (e) => {

  if (!isDragging) return
  if (!audio.duration) return

  handleDrag(e)
})

document.addEventListener("pointerup", () => {

  if (wasPlaying && isDragging) {
    audio.play()
  }

  isDragging = false
})



let volume = document.querySelector(".volume")

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100
})

function toggle_navmenu() {
  document.querySelector(".right-navbar").classList.toggle("display-none")
}
let navmenu = document.querySelector(".navmenu")
navmenu.addEventListener("click", toggle_navmenu)

function toggle_centermenu() {
  document.querySelector(".center-left").classList.toggle("display-none")
}
let centermenu = document.querySelector(".centermenu")
centermenu.addEventListener("click", toggle_centermenu)

const parent = document.querySelector(".center-right");
const child = document.querySelector(".seekbar");

function syncFixedToParent() {
  const rect = parent.getBoundingClientRect();

  child.style.width = rect.width - 50 + "px";
  child.style.left = rect.left + 10 + "px";
}

window.addEventListener("load", syncFixedToParent);
window.addEventListener("resize", syncFixedToParent);