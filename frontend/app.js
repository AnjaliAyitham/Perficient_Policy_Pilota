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
const faqBtn = document.getElementById('faq-btn');
const faqPanel = document.getElementById('faq-panel');
const faqClose = document.getElementById('faq-close');
const sidebarSearch = document.getElementById('sidebar-search');
const userAvatarBtn = document.getElementById('user-avatar');
const avatarDropdown = document.getElementById('avatar-dropdown');
const avatarCustomInput = document.getElementById('avatar-custom');

let sessionId = null;
let isProcessing = false;
let userInitial = localStorage.getItem('policypilot_avatar') || 'Y';

// Initialize avatar
userAvatarBtn.textContent = userInitial;

// Fetch health/doc count
async function fetchDocCount() {
    try {
        const res = await fetch(`${API_BASE}/api/health`);
        const data = await res.json();
        docCountEl.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
            <span>${data.vectorstore_documents} document chunks indexed</span>
        `;
        const statDocs = document.getElementById('stat-docs');
        if (statDocs) statDocs.textContent = data.vectorstore_documents || '30';
    } catch {
        docCountEl.querySelector('span').textContent = 'Server offline';
    }
}
fetchDocCount();

// --- Sidebar Search / Filter ---
sidebarSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.nav-item').forEach(item => {
        const label = (item.dataset.label || item.textContent).toLowerCase();
        item.classList.toggle('hidden', !label.includes(query));
    });
});

// --- Avatar Customization ---
userAvatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarDropdown.classList.toggle('open');
});

document.querySelectorAll('.avatar-option').forEach(btn => {
    btn.addEventListener('click', () => {
        setAvatar(btn.dataset.initial);
        avatarDropdown.classList.remove('open');
    });
});

avatarCustomInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toUpperCase();
    if (val) {
        setAvatar(val);
        avatarDropdown.classList.remove('open');
    }
});

function setAvatar(initial) {
    userInitial = initial;
    userAvatarBtn.textContent = initial;
    localStorage.setItem('policypilot_avatar', initial);
}

document.addEventListener('click', (e) => {
    if (!avatarDropdown.contains(e.target) && e.target !== userAvatarBtn) {
        avatarDropdown.classList.remove('open');
    }
});

// --- FAQ Panel ---
faqBtn.addEventListener('click', () => {
    const isVisible = faqPanel.style.display !== 'none';
    faqPanel.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        welcomeDiv.style.display = 'none';
    }
});

faqClose.addEventListener('click', () => {
    faqPanel.style.display = 'none';
});

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        faqPanel.style.display = 'none';
        sendMessage(item.dataset.question);
    });
});

// --- Utility ---
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
    faqPanel.style.display = 'none';
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

// --- Messages ---
function addMessage(role, content, sources = []) {
    hideWelcome();
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? userInitial : 'P';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    if (role === 'user') {
        contentDiv.textContent = content;
    } else {
        contentDiv.innerHTML = renderMarkdown(content);
        addCopyButton(contentDiv, content);
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

// --- Copy Button ---
function addCopyButton(contentDiv, text) {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
    contentDiv.appendChild(copyBtn);
}

// --- Typing Indicator ---
function createTypingIndicator() {
    hideWelcome();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = 'typing-message';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'P';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-message');
    if (el) el.remove();
}

// --- Progress Indicator ---
function showSearchProgress(contentDiv) {
    const progress = document.createElement('div');
    progress.className = 'search-progress';
    progress.id = 'search-progress';
    progress.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
        <span class="search-progress-text">Searching policy documents...</span>
    `;
    contentDiv.innerHTML = '';
    contentDiv.appendChild(progress);
}

function updateSearchProgress(contentDiv, text) {
    const progressText = contentDiv.querySelector('.search-progress-text');
    if (progressText) progressText.textContent = text;
}

function removeSearchProgress(contentDiv) {
    const progress = contentDiv.querySelector('.search-progress');
    if (progress) progress.remove();
}

// --- Streaming Message ---
function createStreamingMessage() {
    removeTypingIndicator();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'P';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    showSearchProgress(contentDiv);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
    return contentDiv;
}

function updateStreamingMessage(contentDiv, fullText) {
    removeSearchProgress(contentDiv);
    contentDiv.innerHTML = renderMarkdown(fullText) + '<span class="streaming-cursor"></span>';
    scrollToBottom();
}

function finalizeStreamingMessage(contentDiv, fullText, sources) {
    removeSearchProgress(contentDiv);
    contentDiv.innerHTML = renderMarkdown(fullText);
    addCopyButton(contentDiv, fullText);
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

// --- Send Message ---
async function sendMessage(question) {
    if (!question.trim() || isProcessing) return;

    isProcessing = true;
    addMessage('user', question);
    setLoading(true);

    // Show typing indicator first
    const typingEl = createTypingIndicator();

    let contentDiv;
    let fullText = '';
    let sources = [];
    let firstTokenReceived = false;

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
            removeTypingIndicator();
            contentDiv = createStreamingMessage();
            const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
            contentDiv.innerHTML = renderMarkdown(`I'm sorry, I encountered an error: ${error.detail || 'Please try again later.'}`);
            return;
        }

        // Replace typing indicator with streaming message
        removeTypingIndicator();
        contentDiv = createStreamingMessage();

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
                        if (!firstTokenReceived) {
                            firstTokenReceived = true;
                            updateSearchProgress(contentDiv, 'Generating answer...');
                        }
                        fullText += event.content;
                        if (!renderTimeout) {
                            renderTimeout = setTimeout(() => {
                                updateStreamingMessage(contentDiv, fullText);
                                renderTimeout = null;
                            }, 50);
                        }
                    } else if (event.type === 'sources') {
                        sources = event.sources || [];
                        if (!firstTokenReceived) {
                            updateSearchProgress(contentDiv, `Found ${sources.length} relevant policies...`);
                        }
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
        removeTypingIndicator();
        if (!contentDiv) contentDiv = createStreamingMessage();
        removeSearchProgress(contentDiv);
        contentDiv.innerHTML = renderMarkdown('I could not connect to the server. Please make sure the backend is running.');
    } finally {
        setLoading(false);
        isProcessing = false;
    }
}

// --- Event Listeners ---
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
    faqPanel.style.display = 'none';
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

// Category cards on welcome screen
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        sendMessage(card.dataset.question);
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
