var audio = {
    init: function() {
    var $that = this;
        $(function() {
            $that.components.media();
        });
    },
    components: {
        media: function(target) {
            var media = $('audio.fc-media', (target !== undefined) ? target : 'body');
            if (media.length) {
                media.mediaelementplayer({
                    audioHeight: 40,
                features : ['playpause', 'current', 'duration', 'progress', 'volume', 'tracks', 'fullscreen'],
                    alwaysShowControls: true,
                    timeAndDurationSeparator: '<span></span>',
                    iPadUseNativeControls: true,
                    iPhoneUseNativeControls: true,
                    AndroidUseNativeControls: true
                });
            }
        },
    
    },
};
audio.init();

document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('fc-media');
    const timeDisplay = document.getElementById('current-time');
    
    // Format seconds as mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Update time display
    function updateTime() {
        timeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
    
    // Update time regularly
    audioPlayer.addEventListener('timeupdate', updateTime);
    
    // Also update when user seeks
    audioPlayer.addEventListener('seeked', updateTime);
});



    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.getElementById('toggle-form');
        const formContainer = document.getElementById('song-form-container');

        toggleBtn.addEventListener('click', function() {
            const isVisible = formContainer.style.display === 'block';
            formContainer.style.display = isVisible ? 'none' : 'block';
        });
    });

const lyrics_content = document.querySelector('.song-lyrics')
const lyricsData = JSON.parse(lyrics_content.getAttribute('data-lyrics'));

console.log(lyricsData)

    const audioPlayer = document.getElementById('fc-media');
    const timeDisplay = document.getElementById('current-time');
    

    function seekToNearestLyricBeforeCurrentTime(audioPlayer, lyricsData) {
        // Get current time in seconds
        const currentTime = audioPlayer.currentTime;
        
        // Convert all lyric times to seconds and find the closest one <= currentTime
        let closestTime = 0;
        let closestIndex = -1;
        
        lyricsData.forEach((lyric, index) => {
            const [minutes, seconds] = lyric.time.split(':');
            const timeInSeconds = parseFloat(minutes) * 60 + parseFloat(seconds);

            if (timeInSeconds <= currentTime && timeInSeconds > closestTime) {
                
                closestTime = timeInSeconds;
                closestIndex = index;
            }
        });
        
        // If we found a matching time, seek to it
        if (closestIndex !== -1) {
            
            current_lyric=lyricsData[closestIndex].lyrics
            console.log(current_lyric)
            return current_lyric;
        }
        
        return "[instrumental]";
    }



    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = this.currentTime;
        const currentLyric = seekToNearestLyricBeforeCurrentTime(audioPlayer, lyricsData);
        console.log(currentLyric)
        lyrics_content.textContent=currentLyric
        

    });

    lyricsData.forEach((lyric, index) => {
        const [minutes, seconds] = lyric.time.split(':');
        console.log("minutes" + minutes + "seconds" + seconds + "lyric time" + lyric.time.split(":"))
        const timeInSeconds = parseFloat(minutes) * 60 + parseFloat(seconds);
        console.log("time is:" + timeInSeconds)
    });
