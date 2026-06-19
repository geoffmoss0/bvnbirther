

export default function Style(props) {

    const pageStyle = props.pageStyle;

    // todo add logos here?
    const styleOptions = {
        "styles": [
            { // warlock
                "foreground": "#ff0c0c",
                "background": "#221f21"
            }, 
            { // factory
                "foreground": "#fff69a",
                "background": "#160607"
            }, 
            { // seedwhisker
                "foreground": "#3dad4a",
                "background": "#ffffff"
            }, 
            { // soulless
                "foreground": "#e68b2f",
                "background": "#3b3737"
            },
            { // shaman
                "foreground": "#188ad1",
                "background": "#000000"
            }, 
            { // hibernation
                "foreground": "#c08a7e",
                "background": "#5f4744"
            }
        ]
    }


    return(
        <style>{`
            #appcontainer {
                color: ${styleOptions.styles[pageStyle].foreground};
                background-color: ${styleOptions.styles[pageStyle].background};
            }

            .division-rule {
                color: ${styleOptions.styles[pageStyle].foreground};
            }

            .death_button {
                color: ${styleOptions.styles[pageStyle].foreground};
                background-color: ${styleOptions.styles[pageStyle].background};
                border: ${styleOptions.styles[pageStyle].foreground};
                border-style: solid;
                border-radius: 7px;
            }

            .refresh_button {
                color: ${styleOptions.styles[pageStyle].foreground};
                background-color: ${styleOptions.styles[pageStyle].background};
                border: ${styleOptions.styles[pageStyle].foreground};
                border-style: solid;
                border-radius: 5px;
            }

            #report-issue-button{
                border: ${styleOptions.styles[pageStyle].foreground};
                border-style: solid;
                border-width: 2px;
                border-radius: 5px;
            }

            #report-issue-text {
                color: ${styleOptions.styles[pageStyle].foreground};
            }
            
            .mobileDivider {
                color: ${styleOptions.styles[pageStyle].foreground};
            }

            body {
                background-color: ${styleOptions.styles[pageStyle].background};
            }
            `}
        </style>
    )
}