import { minify } from 'html-minifier';
import { projects } from '../data/projects';

export function renderProjects() {
    const result = projects.map(project => 
        `
            <div class="project">
                <div class="project-image-root">
                ${project.image ? 
                    `<img class="project-image" src="${project.image}" />` :
                    `
                        <div class="project-confidential">
                            <div class="project-text">${project.confidentialText}</div>
                        </div>
                    ` 
                }
                    <div class="project-overlay"></div>
                </div>
                <div class="project-info">
                    <div class="project-name">${project.name}</div>
                    <div class="project-meta">${project.year} | ${project.role}</div>
                    <div class="project-description">${project.description}</div>
                    ${project.links ? 
                        `
                            <ul class="project-links">
                                ${project.links.map(link => 
                                    `
                                        <li class="project-link-item">
                                            <a class="project-link" href="${link.url}">${link.text}</a>
                                        </li>
                                    `
                                ).join('')}
                            </ul>
                        ` : `
                            <div class="project-nolink">${project.noLinkText}</div>
                        `
                    }
                </div>
            </div>
        `
    ).join('');

    return result;
}

export function html(body: string, styles: string, scripts: string): string {
    const projects = renderProjects();
    const template = `
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Won's Garage</title>
                <style>${styles}</style>
            </head>
            <body>
                <header class="header">
                    <div class="brand">
                        <span class="brand-highlight">Won</span>'s Garage
                    </div>
                    <nav class="menu">
                        <ul class="menu-list">
                            <li class="menu-item">
                                <a class="menu-link" href="https://github.com/wonsong" target="_blank">
                                    Github
                                </a>
                            </li>
                            <li class="menu-item">
                                <a class="menu-link" href="https://www.linkedin.com/in/iamwonsong/" target="_blank">
                                    LinkedIn
                                </a>
                            </li>
                            <li class="menu-item">
                                <a class="menu-link" href="mailto:hello@wonsong.me" target="_blank">
                                    Email
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main class="project-list">${projects}</main>
                <script>${scripts}</script>
            </body>
        </html>
    `;

    const minified = minify(template, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        minifyCSS: true
    });

    return minified;
}