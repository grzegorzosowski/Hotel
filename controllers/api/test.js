const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = {
    homePage(req, res) {
        const component = React.createElement('h1', null, 'Hello World xD');
        const html = ReactDOMServer.renderToString(component);

        res.send(html);
    }
}