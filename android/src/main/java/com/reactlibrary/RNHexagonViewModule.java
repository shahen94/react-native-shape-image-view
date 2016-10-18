package com.reactlibrary;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class RNHexagonViewModule extends ViewGroupManager<RNShapeView> {

    private ReactContext reactContext;

    public RNHexagonViewModule(ReactContext context) {
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "RNHexagonView";
    }

    @Override
    protected RNShapeView createViewInstance(ThemedReactContext reactContext) {
        return new RNShapeView(reactContext);
    }
}