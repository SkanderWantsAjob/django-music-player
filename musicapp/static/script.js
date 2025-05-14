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

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('fc-media'); // The audio element
    const lyricsContainer = document.getElementById('song-lyrics'); // Container to display lyrics
    let currentLyricIndex = 0; // To track which lyric to show

    // Retrieve the lyrics data from the data attribute and parse it as JSON
    const lyricsData = JSON.parse(lyricsContainer.getAttribute('data-lyrics'));

    // Event listener for audio time update
    audio.addEventListener('timeupdate', function () {
        const currentTime = audio.currentTime; // Get current time of the audio

        // Loop to find the lyric to display based on the current time
        while (currentLyricIndex < lyricsData.length - 1 && currentTime >= timeToSeconds(lyricsData[currentLyricIndex].time)) {
            currentLyricIndex++; // Move to the next lyric
        }

        // Update the displayed lyrics
        lyricsContainer.innerText = lyricsData[currentLyricIndex].lyrics;
    });

    // Helper function to convert time (like "1:45") into seconds
    function timeToSeconds(time) {
        const [minutes, seconds] = time.split(':').map(parseFloat); // Split the time into minutes and seconds
        return minutes * 60 + seconds; // Convert to total seconds
    }
});




    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.getElementById('toggle-form');
        const formContainer = document.getElementById('song-form-container');

        toggleBtn.addEventListener('click', function() {
            const isVisible = formContainer.style.display === 'block';
            formContainer.style.display = isVisible ? 'none' : 'block';
        });
    });

