
package com.reactlibrary;

import android.graphics.Color;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.github.siyamed.shapeimageview.HexagonImageView;

public class RNShapeImageViewModule extends SimpleViewManager<HexagonImageView> {

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
  protected HexagonImageView createViewInstance(ThemedReactContext reactContext) {
    return new HexagonImageView(reactContext);
  }

  @ReactProp(name="src")
  public void setSource(HexagonImageView view, String src) {
    Log.d("HEXAGON_IMAGE_VIEW", src);
    view.setImageURI(Uri.parse(src));
  }

  @ReactProp(name="backgroundColor")
  public void setBackgroundColor(HexagonImageView view, @Nullable String color) {
    if (color == null) {
      view.setBackgroundColor(Color.TRANSPARENT);
      return;
    }
    int parsedColor = Color.parseColor(color);
    view.setBackgroundColor(parsedColor);
  }

  @ReactProp(name="borderWidth")
  public void setBorderWidth(HexagonImageView view, int width) {
    view.setBorderWidth(width);
  }

  @ReactProp(name="borderColor")
  public void setBorderColor(HexagonImageView view, @Nullable String color) {
    if (color == null) {
      view.setBorderColor(Color.TRANSPARENT);
      return;
    }
    int parsedColor = Color.parseColor(color);
    view.setBorderColor(parsedColor);
  }

  @Override
  public void setAccessibilityLabel(HexagonImageView view, String accessibilityLabel) {
    super.setAccessibilityLabel(view, accessibilityLabel);
  }

  @Override
  public void setAccessibilityComponentType(HexagonImageView view, String accessibilityComponentType) {
    super.setAccessibilityComponentType(view, accessibilityComponentType);
  }

  @Override
  public void setTestId(HexagonImageView view, String testId) {
    super.setTestId(view, testId);
  }
}
