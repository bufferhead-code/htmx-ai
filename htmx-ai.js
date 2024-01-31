htmx.defineExtension('ai', {
    onEvent: function (name, evt) {
        if (name === 'htmx:beforeProcessNode') {
            evt.target.querySelectorAll('[hx-ai]').forEach(el => {
                el.setAttribute('hx-post', 'http://htmx-ai.test/');
                if(el.getAttribute('hx-ai').startsWith('js:')){
                    el.setAttribute('hx-vals', 'js:{prompt: ' + el.getAttribute('hx-ai').replace('js:', '') + '}');
                }
                else {
                    el.setAttribute('hx-vals', '{"prompt": "' + el.getAttribute('hx-ai') + '"}');
                }
            });
        }
    }
})