import React from 'react';

class LangSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: document.location.pathname
        }
    };

    handleLangSwitch = (lang) => {
        window.location.href = '/' + lang;
    }
    render() {
        return (
            <div className="langswitcher">
                <span>
                    <button onClick={e => this.handleLangSwitch('nl')} className="mr-2">NL</button>
                    |</span>
                <span>
                    <button onClick={e => this.handleLangSwitch('eng')} className="mr-2">EN</button>
                    |</span>
                <span>
                    <button onClick={e => this.handleLangSwitch('fr')} className=" mr-2">FR</button>
                    |</span>
                <span>
                    <button onClick={e => this.handleLangSwitch('de')} className="active">DE</button>
                </span>
            </div>
        );
    }

}

export default LangSwitch;