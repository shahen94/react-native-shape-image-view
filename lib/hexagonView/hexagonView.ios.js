import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent, processColor } from 'react-native';

export class HexagonView extends Component {
    static propTypes = {
        ...View.propTypes,
        borderWidth: PropTypes.number,
        borderColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        size: PropTypes.number.isRequired,
        isHorizontal: PropTypes.bool,
    };

    static defaultProps = {
    isHorizontal: false,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'white',
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            children,
            borderColor,
            borderWidth,
            backgroundColor,
            isHorizontal,
            size,
            ...props
        } = this.props;

        return (
            <NativeRNShapeView
                {...props}
                borderColor={processColor(borderColor).toString()}
                borderWidth={borderWidth}
                background_Color={processColor(backgroundColor).toString()}
                isHorizontal={isHorizontal}
                size={size}
            >
                    {children}
            </NativeRNShapeView>
            );
        }
}

const NativeRNShapeView = requireNativeComponent('RNShapeView', HexagonView);
