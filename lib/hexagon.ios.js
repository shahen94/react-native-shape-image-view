//export {};
import React, { Component, PropTypes } from 'react';
import {
    requireNativeComponent,
    DeviceEventEmitter,
    processColor,
} from 'react-native';
const ReactNative = require('react-native');
// import resolveAssetSource from 'resolveAssetSource';

const LOADED_EVENT = "RNShapeImageView:Loaded";
const emptyFunction = () => {};

export class HexagonImage extends Component {
    static propTypes = {
        setDefaultSize: PropTypes.bool,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number,
        ]),
        borderWidth: PropTypes.number,
        borderColor: PropTypes.string,
        background_Color: PropTypes.string,
        size: PropTypes.number.isRequired,
        isHorizontal: PropTypes.bool,
        ...Image.propTypes
    }
    static defaultProps = {
        setDefaultSize: false,
        isHorizontal: false,
        borderWidth: 0,
        borderColor: 'transparent',
        onLoad: emptyFunction,
    }

    constructor(props, context) {
        super(props, context);
        this.onLoadListener = null;
    }

    componentWillMount() {
        const { src } = this.props;
        this.onLoadListener = DeviceEventEmitter
            .addListener(LOADED_EVENT, this.props.onLoad);
    }

    componentWillUnmount() {
        this.onLoadListener.remove();
        this.onLoadListener = null;
    }

    render() {
        const {
            children,
            borderColor,
            borderWidth,
            background_Color,
            isHorizontal,
            size,
    } = this.props;

    return (
        <NativeRNShapeView
            borderColor={processColor(borderColor).toString()}
            borderWidth={borderWidth}
            background_Color={processColor(background_Color).toString()}
            isHorizontal={isHorizontal}
            size={size}

        >
        {children}
        </NativeRNShapeImageView>
        );
    }
}

const NativeRNShapeView = requireNativeComponent('RNShapeView', HexagonImage);
