/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const EMAIL = 'y51288033@outlook.com';
const root = document.documentElement;
const themeMeta = document.querySelector('meta[name="theme-color"]');
const copyButton = document.getElementById('copy-email');
const printButton = document.getElementById('print-resume');
const themeButton = document.getElementById('toggle-theme');
const toast = document.getElementById('toast');

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyEmail() {
    try {
        await navigator.clipboard.writeText(EMAIL);
        copyButton.querySelector('span').textContent = 'Copied!';
        showToast('邮箱已复制到剪贴板');
        window.setTimeout(() => {
            copyButton.querySelector('span').textContent = 'Copy Email';
        }, 2000);
    } catch (error) {
        window.location.href = `mailto:${EMAIL}`;
    }
}

function setTheme(theme) {
    root.dataset.theme = theme;
    themeMeta.setAttribute('content', theme === 'dark' ? '#111c18' : '#eff9ef');
    try {
        localStorage.setItem('resume-theme', theme);
    } catch (error) {
        // The page remains usable when storage is unavailable.
    }
}

function toggleTheme() {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
}

function initializeTheme() {
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('resume-theme');
    } catch (error) {
        savedTheme = null;
    }

    if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
        return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
}

function initializeReveal() {
    const sections = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        sections.forEach(section => section.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08
    });

    sections.forEach(section => observer.observe(section));
}

copyButton.addEventListener('click', copyEmail);
printButton.addEventListener('click', () => window.print());
themeButton.addEventListener('click', toggleTheme);

initializeTheme();
initializeReveal();
