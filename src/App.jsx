import { useState, useEffect, useRef } from 'react';
import './index.css';

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const musicTracks = [
    {
      name: 'Nơi này có anh',
      url: '/Noi.nay.co.anh.mp3',
    },
  ];

  const links = [
    { text: '▶️ YouTube', url: 'https://www.youtube.com/@Tuitennguyen28' },
    { text: '👍 Facebook', url: 'https://www.facebook.com/ngynz28/' },
    { text: '🎵 TikTok', url: 'https://tiktok.com/@tuitennguyen06?_r=1&_t=ZS-97bWOWGpvBS' },
    { text: '☁️ SoundCloud', url: 'https://soundcloud.com/kc-ryan-846842291' },
  ];

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 500);
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.muted = false;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="avatar">
          <img src="https://i.ibb.co/RTyTJ3Wj/2024-09-19-20-01-0-CC280-F2-A7-FC-49-F4-83-DA-4-FE0-DC008-A52.jpg" alt="Logo" />
        </div>
        <h1 className="name">Nguyễn Vũ Nguyên</h1>
        <p className="bio">
          (NgynZ)<br />
          🌟 Creative Developer | Music Lover | Tech Enthusiast<br />
          Nhìn Cái Chóa Gì !!!
        </p>

        <div className="links">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
            >
              {link.text}
            </a>
          ))}
        </div>

        <div className="music-player">
          <div className="player-title">🎧 Nhạc nền</div>

          <div className="player-controls">
            <button
              className="control-btn active"
              onClick={togglePlay}
            >
              {isPlaying ? '⏸️ Tắt Nhạc' : '🔊 Bật Nhạc'}
            </button>
          </div>

          <div className="now-playing">
            ▶️ {musicTracks[currentTrack].name}
          </div>

          <audio 
            ref={audioRef}
            autoPlay
            muted
            key={currentTrack}
          >
            <source src={musicTracks[currentTrack].url} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default App;