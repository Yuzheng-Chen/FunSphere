function setupGame() {
    var gameType = new URLSearchParams(window.location.search).get('gm') || 'ClickerGamePlus';
    var formattedGameType = gameType.replace(/([A-Z])/g, ' $1').trim(); // 将camelCase或其他形式转换为带空格的形式

    // 更新标题和H1
    document.getElementById('page-title').textContent = formattedGameType;
    document.getElementById('main-title').textContent = formattedGameType;

    // 设置iframe的src
    document.getElementById('game-iframe').src = "https://yuzheng-chen.github.io/GamesHub?gm=" + gameType;

    // 加载Markdown文件
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

// 页面加载时，设置内容
window.onload = setupGame;