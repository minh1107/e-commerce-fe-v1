/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: '#ee3131',
      },
      textColor: {
        main: '#ee3131'
      },
      width: {
        main: '90vw',
        tablet: '80vw',
        phone: '100vw'
      },
      fontFamily: {
        poppin: ['Poppins', 'sans-serif']
      },
      borderColor: {
        main: '#ee3131'
      },
      flex: {
        '2': '2 2 0',
        '3': '3 3 0',
        '4': '4 4 0',
        '5': '5 5 0',
        '6': '6 6 0',
      },
      animation: {
        toRight: 'toRight 0.5s ease-in-out forwards',     
        toLeft: 'toLeft 0.5s ease-in-out forwards',
        showNavbar: 'toTop 0.3s ease-in-out forwards',
        hiddenNavbar: 'hiddenNavbar 0.3s ease-in-out forwards',
        leftSlideButtonEffectHover: 'leftSlideButtonEffectHover 0.3s ease-in-out forwards',        
        rightSlideButtonEffectHover: 'rightSlideButtonEffectHover 0.3s ease-in-out forwards',
        rightSlideButtonEffectAfteHover: 'rightSlideButtonEffectAfteHover 0.3s ease-in-out forwards',
        leftSlideButtonEffectAfterHover: 'leftSlideButtonEffectAfterHover 0.3s ease-in-out forwards',
        textDown500: 'textDown 0.5s ease-in-out forwards',
        textDown800: 'textDown 1.2s ease-in-out forwards',
        textDown1000: 'textDown 1.4s ease-in-out forwards',
        textRight500: 'textRight 0.5s ease-in-out forwards',
        textRight800: 'textRight 1.2s ease-in-out forwards',
        textRight1000: 'textRight 1.4s ease-in-out forwards',
        easeInDisplay: 'easeInDisplay 1s ease-in-out forwards',
        headerEffect: 'headerEffect .3s ease-in-out forwards',
        headerEffectBack: 'headerEffectBack .3s ease-in-out forwards',
        showOutline: 'showOutline .6s ease-in-out forwards',
        fromToLeft: 'fromToLeft .4s ease-in-out forwards',
        fromToRight: 'fromToRight .4s ease-in-out forwards',
        faded: 'faded .4s ease-in-out forwards',
        zoom: 'zoom 0.4s ease-in-out forwards',
        unZoom: 'unZoom 0.4s ease-in-out forwards',
        slideTop: 'slide-top 0.2s ease-in-out forwards' 
      },
      keyframes: {
        toRight: {
          '0%': {
            'margin-left': '0'
          },
          '100%': {
            'margin-left': '8px'
          }
        },
        toLeft: {
          '0%': {
            'margin-left': '8px'
          },
          '100%': {
            'margin-left': '0'
          }
        },
        toTop: {
          '0%': {
            top: '40px',
            opacity: 0
          },
          '100%': {
            top: '30px',
            opacity: 1
          }
        },
        hiddenNavbar: {
          '0%': {
            top: '30px',
            opacity: 1
          },
          '100%': {
            top: '40px',
            opacity: 0,
            display: 'none'
          }
        },
        leftSlideButtonEffectHover: {
          '0%': {
            left: '40px', 
            opacity: 0
          },
          '100%': {
            left: '30px',
            opacity: 1
          }
        },
        rightSlideButtonEffectHover: {
          '0%': {
            right: '40px',
            opacity: 0
          },
          '100%': {
            right: '30px',
            opacity: 1
          }
        },
        leftSlideButtonEffectAfterHover: {
          '0%': {
            left: '30px',
            opacity: 1
          },
          '100%': {
            left: '40px',
            opacity: 0
          }
        },
        rightSlideButtonEffectAfteHover: {
          '0%': {
            right: '30px',
            opacity: 1
          },
          '100%': {
            right: '40px',
            opacity: 0
          }
        },
        textDown: {
          '0%': {
            'transform': 'translateY(-40px)',
            opacity: 0
          }, 
          '100%': {
            'transform': 'translateY(0)',
            opacity: 1
          }
        },
        textRight: {
          '0%': {
            'transform': 'translateX(-40px)',
            opacity: 0
          }, 
          '100%': {
            'transform': 'translateX(0)',
            opacity: 1
          }
        },
        easeInDisplay: {
          '0%': {
            opacity: 0.5
          },
          '100%': {
            opacity: 1
          }
        },
        headerEffect: {
          '0%': {
            top: '-185px'
          },
          '100%': {
            top: 0
          }
        },
        headerEffectBack: {
          '0%': {
            'padding-top': '200px'
          },
          '100%': {
            'padding-top': '0px'
          }
        },
        showOutline: {
          '0%': {
            'outline-color': '#ccc',
          },
          '100%': {
            'outline-color': 'gray',
          }
        },
        fromToLeft: {
          '0%': {
            'margin-left': '20%',
            opacity: 0.4
          },
          '100%': {
            'margin-left': '50%',
            transform: 'translateX(-50%)',
            opacity: 1
          }
        },
        fromToRight: {
          '0%': {
            'margin-left': '50%',
            transform: 'translateX(-50%)',
            opacity: 1
          },
          '100%': {
            'margin-left': '50%',
            transform: 'translateX(-20%)',
            opacity: 1
          }
        },
        faded: {
          '0%': {
              opacity: 1,
              display: 'flex',
          },
          '100%': {
            opacity: 0,
            display: 'none'
          }
        },
        zoom: {
          '0%': {
            backgroundSize: '100%'
        },
          '100%': {
            backgroundSize: '120%'
          }
        },
        unZoom: {
          '0%': {
            backgroundSize: '120%'
        },
          '100%': {
            backgroundSize: '100%'
          }
        },
        footerUp: {
          '0%': {
            bottom: '10px',
            opacity: 0
          },
          '100%': {
            bottom: '30px',
            opacity: 1
          }
        },
        footerDown: {
          '0%': {
            bottom: '30px',
            opacity: 1
          },
          '100%': {
            bottom: '10px',
            display: 'none',
            opacity: 0
          }
        },
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translate(-50%,40px);',
            transform: 'translate(-50%,40px);',
            opacity: 0
          },
          '100%': {
            '-webkit-transform': 'translate(-50%,0px);',
            transform: 'translate(-50%,0px);',
            opacity: 1
          }
        }
      },
 
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}