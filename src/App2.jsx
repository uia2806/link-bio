import { useState, useEffect, useRef } from 'react';
import './index.css';

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef(null);

  const musicTracks = [
    {
      name: 'Nơi này có anh',
      url: 'Noi.nay.co.anh.mp3',
    },
    // Thêm các bài hát khác tương tự
  ];

  const links = [
    { text: '▶️ YouTube', url: 'https://www.youtube.com/@Tuitennguyen28', color: '#FF0000' },
    { text: '👍 Facebook', url: 'https://www.facebook.com/ngynz28/', color: '#1877F2' },
    { text: '🎵 TikTok', url: 'https://tiktok.com/@tuitennguyen06?_r=1&_t=ZS-97bWOWGpvBS', color: '#000000' },
    { text: '☁️ SoundCloud', url: 'https://soundcloud.com/kc-ryan-846842291', color: '#FF7700' },
  ];

  // Auto play khi component mount lần đầu
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && !isInitialized) {
        try {
          audioRef.current.volume = volume;
          await audioRef.current.play();
          setIsPlaying(true);
          setIsInitialized(true);
        } catch (err) {
          // Nếu autoplay bị chặn, cho phép user click để bật
          console.log('Autoplay bị chặn, người dùng cần click để bật');
        }
      }
    };

    const timer = setTimeout(playAudio, 300);
    return () => clearTimeout(timer);
  }, []);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Xử lý khi nhạc kết thúc
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (currentTrack < musicTracks.length - 1) {
        setCurrentTrack(currentTrack + 1);
      } else {
        setCurrentTrack(0);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentTrack, musicTracks.length]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const nextTrack = () => {
    if (currentTrack < musicTracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const prevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  return (
    <div className="container">
      <div className="profile">
        {/* Avatar với animation */}
        <div className="avatar-wrapper">
          <div className="avatar">
            <img 
              src="https://i.ibb.co/RTyTJ3Wj/2024-09-19-20-01-0-CC280-F2-A7-FC-49-F4-83-DA-4-FE0-DC008-A52.jpg" 
              alt="Logo" 
            />
          </div>
          {isPlaying && <div className="pulse"></div>}
        </div>

        {/* Profile Info */}
        <h1 className="name">Nguyễn Vũ Nguyên</h1>
        <p className="bio">
          (NgynZ)<br />
          🌟 Creative Developer | Music Lover | Tech Enthusiast<br />
          Nhìn Cái Chóa Gì !!!
        </p>

        {/* Social Links */}
        <div className="links">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
              style={{
                '--link-color': link.color,
              }}
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* Music Player */}
        <div className="music-player">
          <div className="player-header">
            <div className="player-title">🎧 Nhạc nền</div>
            {isPlaying && <div className="music-indicator">♪ ♫ ♪</div>}
          </div>

          {/* Now Playing Track */}
          <div className="now-playing">
            <div className="track-name">▶️ {musicTracks[currentTrack].name}</div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar"
            />
            <div className="time-info">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="player-controls">
            <button
              className="control-btn prev-btn"
              onClick={prevTrack}
              disabled={currentTrack === 0}
              title="Bài trước"
            >
              ⏮️
            </button>

            <button
              className="control-btn play-btn active"
              onClick={togglePlay}
              title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            <button
              className="control-btn next-btn"
              onClick={nextTrack}
              disabled={currentTrack === musicTracks.length - 1}
              title="Bài tiếp theo"
            >
              ⏭️
            </button>
          </div>

          {/* Volume Control */}
          <div className="volume-section">
            <label>🔊</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span className="volume-value">{Math.round(volume * 100)}%</span>
          </div>

          {/* Audio Element */}
          <audio 
            ref={audioRef}
            key={currentTrack}
            crossOrigin="anonymous"
          >
            <source src={musicTracks[currentTrack].url} type="audio/mpeg" />
          </audio>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Made with 💜 by NgynZ</p>
        </div>
      </div>
    </div>
  );
};

export default App;
