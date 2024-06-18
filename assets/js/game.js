function setupGame() {
    var gameType = new URLSearchParams(window.location.search).get('gm') || 'ClickerGamePlus';
    var formattedGameType = gameType.replace(/([A-Z])/g, ' $1').trim();
    document.getElementById('page-title').textContent = formattedGameType;
    document.getElementById('main-title').textContent = formattedGameType;

    updateGameSource(gameType);  // Update source based on selection

    fetchMarkdown(gameType);
}

function updateGameSource(gameType) {
    var selectedSource = document.getElementById('source-selector').value;
    document.getElementById('game-iframe').src = selectedSource + "?gm=" + gameType;
}

function fetchMarkdown(gameType) {
    fetch('markdown/' + gameType + '.md')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load the Markdown file');
        }
        return response.text();
    })
    .then(text => {
        document.getElementById('markdown-container').innerHTML = marked.parse(text);
    })
    .catch(error => {
        console.error('Error loading the Markdown file:', error);
        document.getElementById('markdown-container').innerHTML = 'Failed to load Markdown content: ' + error.message;
    });
}

document.getElementById('source-selector').addEventListener('change', function() {
    var gameType = new URLSearchParams(window.location.search).get('gm') || 'ClickerGamePlus';
    updateGameSource(gameType);
});

document.getElementById('fullscreen-btn').addEventListener('click', function() {
    var iframe = document.getElementById('game-iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
    }
});

window.onload = setupGame;
