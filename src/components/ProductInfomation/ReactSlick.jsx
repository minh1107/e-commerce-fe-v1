import React, { Component } from 'react';
import ReactImageMagnify from 'ReactImageMagnify';
import ReactSlick from 'react-slick';

const frontSrcSet = [
    { src: front_500, setting: '500w' },
    { src: front_779, setting: '779w' },
    { src: front_1020, setting: '1020w' },
    { src: front_1200, setting: '1200w' },
    { src: front_1426, setting: '1426w' }
]
    .map(item => `${item.src} ${item.setting}`)
    .join(', ');

const backSrcSet = [
    { src: back_500, setting: '500w' },
    { src: back_779, setting: '779w' },
    { src: back_1020, setting: '1020w' },
    { src: back_1200, setting: '1200w' },
    { src: back_1426, setting: '1426w' }
]
    .map(item => `${item.src} ${item.setting}`)
    .join(', ');

const dataSource = [
    {
        srcSet: frontSrcSet,
        small: front_500,
        large: front_1426
    },
    {
        srcSet: backSrcSet,
        small: back_500,
        large: back_1426
    }
];

export default class ReactSlickExample extends Component {
    render() {
        const {
            rimProps,
            rsProps
        } = this.props;

        return (
            <ReactSlick
                {...{
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }}
                {...rsProps}
            >
                {dataSource.map((src, index) => (
                    <div key={index}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Wristwatch by Versace',
                                    isFluidWidth: true,
                                    src: src.small,
                                    srcSet: src.srcSet,
                                    
                                },
                                largeImage: {
                                    src: src.large,
                                    width: 1426,
                                    height: 2000
                                },
                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                            }}
                            {...rimProps}
                        />
                    </div>
                ))}
            </ReactSlick>
        );
    }
}