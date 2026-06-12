const API_BASE = 'https://perficient-policy-pilota.onrender.com';

const chatContainer = document.getElementById('chat-container');
const messagesDiv = document.getElementById('messages');
const welcomeDiv = document.getElementById('welcome');
const chatForm = document.getElementById('chat-form');
const questionInput = document.getElementById('question-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const statusDot = document.querySelector('.dot');
const docCountEl = document.getElementById('doc-count');

let sessionId = null;
let isProcessing = false;

async function fetchDocCount() {
    try {
        const res = await fetch(`${API_BASE}/api/health`);
        const data = await res.json();
        docCountEl.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
            <span>${data.vectorstore_documents} document chunks indexed</span>
        `;
    } catch {
        docCountEl.querySelector('span').textContent = 'Server offline';
    }
}
fetchDocCount();

function setLoading(loading) {
    sendBtn.disabled = loading;
    questionInput.disabled = loading;
    if (loading) {
        statusDot.classList.add('loading');
    } else {
        statusDot.classList.remove('loading');
    }
}

function hideWelcome() {
    if (welcomeDiv) {
        welcomeDiv.style.display = 'none';
    }
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function renderMarkdown(text) {
    let html = text;

    html = html.replace(/((?:^\|.+\|$\n?)+)/gm, function(tableBlock) {
        const rows = tableBlock.trim().split('\n').filter(r => r.trim());
        if (rows.length < 2) return tableBlock;
        const isSeparator = /^\|[\s\-:]+\|/.test(rows[1]);
        let tableHtml = '<table>';
        let startIdx = 0;
        if (isSeparator && rows.length >= 2) {
            const headerCells = rows[0].split('|').filter(c => c.trim() !== '');
            tableHtml += '<thead><tr>';
            headerCells.forEach(cell => { tableHtml += `<th>${cell.trim()}</th>`; });
            tableHtml += '</tr></thead>';
            startIdx = 2;
        }
        tableHtml += '<tbody>';
        for (let i = startIdx; i < rows.length; i++) {
            const cells = rows[i].split('|').filter(c => c.trim() !== '');
            if (cells.length === 0) continue;
            tableHtml += '<tr>';
            cells.forEach(cell => { tableHtml += `<td>${cell.trim()}</td>`; });
            tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table>';
        return tableHtml;
    });

    html = html.replace(/^>\s?(.+)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>');
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><h([123])>/g, '<h$1>');
    html = html.replace(/<\/h([123])><\/p>/g, '</h$1>');
    html = html.replace(/<p><ul>/g, '<ul>');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    html = html.replace(/<p><table>/g, '<table>');
    html = html.replace(/<\/table><\/p>/g, '</table>');
    html = html.replace(/<p><blockquote>/g, '<blockquote>');
    html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
    html = html.replace(/<p><hr><\/p>/g, '<hr>');
    html = html.replace(/<p><hr>/g, '<hr>');
    html = html.replace(/<p><\/p>/g, '');
    return html;
}

function addMessage(role, content, sources = []) {
    hideWelcome();
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'Y' : 'P';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    if (role === 'user') {
        contentDiv.textContent = content;
    } else {
        contentDiv.innerHTML = renderMarkdown(content);
        if (sources && sources.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.className = 'sources';
            sourcesDiv.innerHTML = `
                <div class="sources-label">Referenced Policies</div>
                ${sources.map(s => `<span class="source-tag">${s.document}</span>`).join('')}
            `;
            contentDiv.appendChild(sourcesDiv);
        }
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
    return contentDiv;
}

function createStreamingMessage() {
    hideWelcome();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'P';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<span class="streaming-cursor"></span>';

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
    return contentDiv;
}

function updateStreamingMessage(contentDiv, fullText) {
    contentDiv.innerHTML = renderMarkdown(fullText) + '<span class="streaming-cursor"></span>';
    scrollToBottom();
}

function finalizeStreamingMessage(contentDiv, fullText, sources) {
    contentDiv.innerHTML = renderMarkdown(fullText);
    if (sources && sources.length > 0) {
        const sourcesDiv = document.createElement('div');
        sourcesDiv.className = 'sources';
        sourcesDiv.innerHTML = `
            <div class="sources-label">Referenced Policies</div>
            ${sources.map(s => `<span class="source-tag">${s.document}</span>`).join('')}
        `;
        contentDiv.appendChild(sourcesDiv);
    }
    scrollToBottom();
}

async function sendMessage(question) {
    if (!question.trim() || isProcessing) return;

    isProcessing = true;
    addMessage('user', question);
    setLoading(true);

    const contentDiv = createStreamingMessage();
    let fullText = '';
    let sources = [];

    try {
        const response = await fetch(`${API_BASE}/api/chat/stream`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question: question,
                session_id: sessionId,
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
            contentDiv.innerHTML = renderMarkdown(`I'm sorry, I encountered an error: ${error.detail || 'Please try again later.'}`);
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let renderTimeout = null;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const jsonStr = line.slice(6).trim();
                if (!jsonStr) continue;

                try {
                    const event = JSON.parse(jsonStr);

                    if (event.type === 'session') {
                        sessionId = event.session_id;
                    } else if (event.type === 'token') {
                        fullText += event.content;
                        if (!renderTimeout) {
                            renderTimeout = setTimeout(() => {
                                updateStreamingMessage(contentDiv, fullText);
                                renderTimeout = null;
                            }, 50);
                        }
                    } else if (event.type === 'sources') {
                        sources = event.sources || [];
                    } else if (event.type === 'done') {
                        if (event.full_answer) fullText = event.full_answer;
                    } else if (event.type === 'error') {
                        fullText = `I'm sorry, I encountered an error: ${event.message}`;
                    }
                } catch (e) {
                    // skip malformed events
                }
            }
        }

        if (renderTimeout) {
            clearTimeout(renderTimeout);
        }
        finalizeStreamingMessage(contentDiv, fullText, sources);

    } catch (error) {
        contentDiv.innerHTML = renderMarkdown('I could not connect to the server. Please make sure the backend is running on port 8000.');
    } finally {
        setLoading(false);
        isProcessing = false;
    }
}

// Event listeners
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = questionInput.value.trim();
    if (question) {
        questionInput.value = '';
        sendMessage(question);
    }
});

clearBtn.addEventListener('click', () => {
    messagesDiv.innerHTML = '';
    welcomeDiv.style.display = 'block';
    if (sessionId) {
        fetch(`${API_BASE}/api/chat/clear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: '', session_id: sessionId }),
        }).catch(() => {});
    }
    sessionId = null;
});

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const question = chip.dataset.question;
        sendMessage(question);
    });
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const question = item.dataset.question;
        sendMessage(question);
        sidebar.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuBtn) {
        sidebar.classList.remove('open');
    }
});

questionInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});
