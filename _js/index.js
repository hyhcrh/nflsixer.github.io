window.$docsify = {
  themeColor: '#ff9500',
  alias: {
    '/((?!en).)*/_sidebar.md': '/_sidebar.md',
    '/((?!en).)*/_navbar.md': '/_navbar.md',
    '/en/.*/_sidebar.md': '/en/_sidebar.md',
    '/en/.*/_navbar.md': '/en/_navbar.md'
  },
  auto2top: true,
  coverpage: true,
  executeScript: true,
  loadSidebar: true,
  loadNavbar: true,
  mergeNavbar: true,
  maxLevel: 4,
  subMaxLevel: 2,
  name: 'NFLSixer',
  search: {
    noData: {
      '/en/': 'No Results',
      '/': '没有结果'
    },
    paths: 'auto',
    placeholder: {
      '/en/': 'Search CN & EN Sites',
      '/': '搜索'
    }
  },
  formatUpdated: '{MM}/{DD} {HH}:{mm}',
  plugins: [
    EditOnGithubPlugin.create('https://github.com/nflsixer/nflsixer.github.io/blob/master/', null, path => {}),
    (hook, vm) => {
      hook.beforeEach(async(content, next) => {
        const path = vm.route.path;
        if (path.indexOf('/editor/math') !== -1) {
          await loadPlugin('mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML');
        } else if (path.indexOf('/editor/diagrams') !== -1) {
          const plugins = [
            'raphael/2.3.0/raphael.min.js',
            'underscore.js/1.11.0/underscore-min.js',
            'js-sequence-diagrams/1.0.6/sequence-diagram-min.js',
            'flowchart/1.15.0/flowchart.min.js',
            'mermaid/8.8.4/mermaid.min.js'
          ];
          for (const src of plugins) {
            await loadPlugin(src);
          }
        }
        next(content);
      });
      hook.doneEach(() => {
        renderMathJax();
        renderDiagrams();
      });
    }
  ]
};

function loadPlugin(path) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/${path}`;
    document.head.appendChild(script);
  });
}