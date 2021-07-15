import React from "react";
import Particles from "react-particles-js";
import '../scss/style.scss';

export const ParticlesComponentBackground: React.FC<{imageUrl: string }> = ({imageUrl}) => {
      return (
        <div className="App" style={{backgroundImage: `url(${imageUrl})`}}>
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 150
                        },
                        "size": {
                            "value": 3
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }}
            />
        </div>
    )
}