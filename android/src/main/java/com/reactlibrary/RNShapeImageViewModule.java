
package com.reactlibrary;

import android.graphics.drawable.Drawable;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.meg7.widget.SvgImageView;
import com.meg7.widget.CircleImageView;

public class RNShapeImageViewModule extends SimpleViewManager<CircleImageView> {

  private final ReactApplicationContext reactContext;
  private final String REACT_CLASS = "RNShapeImageView";

  public RNShapeImageViewModule(ReactApplicationContext reactContext) {
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected CircleImageView createViewInstance(ThemedReactContext reactContext) {
    CircleImageView imageView = new CircleImageView(reactContext);
    return imageView;
  }

  @ReactProp(name = "src")
  public void setSource(SvgImageView view, String src) {
    view.setImageURI(Uri.parse(src));
  }
}
