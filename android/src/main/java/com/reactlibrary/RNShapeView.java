package com.reactlibrary;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.Region;
import android.util.AttributeSet;
import android.util.Log;
import android.view.ViewGroup;

public class RNShapeView extends ViewGroup {
    private Path hexagonPath;
    private Path hexagonBorderPath;
    private Paint mBorderPaint;
    private Integer strokeWidth = 0;
    private int strokeColor = Color.WHITE;

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

    }

    public RNShapeView(Context context) {
        super(context);
        init();
    }

    public RNShapeView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public RNShapeView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        this.setBackgroundColor(Color.TRANSPARENT);
        this.hexagonPath = new Path();
        this.hexagonBorderPath = new Path();

        this.mBorderPaint = new Paint();
        this.mBorderPaint.setColor(this.strokeColor);
        this.mBorderPaint.setStrokeCap(Paint.Cap.ROUND);
        this.mBorderPaint.setStrokeWidth(this.strokeWidth);
        this.mBorderPaint.setStyle(Paint.Style.STROKE);
    }

    private void calculatePath(float radius) {
        float halfRadius = radius / 2f;
        float triangleHeight = (float) (Math.sqrt(3.0) * halfRadius);
        float centerX = getMeasuredWidth() / 2f;
        float centerY = getMeasuredHeight() / 2f;

        this.hexagonPath.reset();
        this.hexagonPath.moveTo(centerX - radius, centerY);
        this.hexagonPath.lineTo(centerX - halfRadius, centerY - triangleHeight);
        this.hexagonPath.lineTo(centerX + halfRadius, centerY - triangleHeight);
        this.hexagonPath.lineTo(centerX + radius, centerY);
        this.hexagonPath.lineTo(centerX + halfRadius, centerY + triangleHeight);
        this.hexagonPath.lineTo(centerX - halfRadius, centerY + triangleHeight);
        this.hexagonPath.close();


        float radiusBorder = radius + (float) this.strokeWidth;
        float halfRadiusBorder = radiusBorder / 2f;
        float triangleBorderHeight = (float) (Math.sqrt(3.0) * halfRadiusBorder);

        this.hexagonBorderPath.reset();
        this.hexagonBorderPath.moveTo(centerX - radiusBorder, centerY);
        this.hexagonBorderPath.lineTo(centerX - halfRadiusBorder, centerY - triangleBorderHeight);
        this.hexagonBorderPath.lineTo(centerX + halfRadiusBorder, centerY - triangleBorderHeight);
        this.hexagonBorderPath.lineTo(centerX + radiusBorder, centerY);
        this.hexagonBorderPath.lineTo(centerX + halfRadiusBorder, centerY + triangleBorderHeight);
        this.hexagonBorderPath.lineTo(centerX - halfRadiusBorder, centerY + triangleBorderHeight);
        this.hexagonBorderPath.close();
        invalidate();
    }

//    private void calculatePath(float radius) {
//        float halfRadius = radius / 2f;
//        float triangleHeight = (float) (Math.sqrt(3.0) * halfRadius);
//        float centerX = getMeasuredWidth() / 2f;
//        float centerY = getMeasuredHeight() / 2f;
//
//        this.hexagonPath.reset();
//        this.hexagonPath.moveTo(centerX, centerY + radius);
//        this.hexagonPath.lineTo(centerX - triangleHeight, centerY + halfRadius);
//        this.hexagonPath.lineTo(centerX - triangleHeight, centerY - halfRadius);
//        this.hexagonPath.lineTo(centerX, centerY - radius);
//        this.hexagonPath.lineTo(centerX + triangleHeight, centerY - halfRadius);
//        this.hexagonPath.lineTo(centerX + triangleHeight, centerY + halfRadius);
//        this.hexagonPath.close();
//
//        float radiusBorder = radius - 5f;
//        float halfRadiusBorder = radiusBorder / 2f;
//        float triangleBorderHeight = (float) (Math.sqrt(3.0) * halfRadiusBorder);
//
//        this.hexagonBorderPath.reset();
//        this.hexagonBorderPath.moveTo(centerX, centerY + radiusBorder);
//        this.hexagonBorderPath.lineTo(centerX - triangleBorderHeight, centerY + halfRadiusBorder);
//        this.hexagonBorderPath.lineTo(centerX - triangleBorderHeight, centerY - halfRadiusBorder);
//        this.hexagonBorderPath.lineTo(centerX, centerY - radiusBorder);
//        this.hexagonBorderPath.lineTo(centerX + triangleBorderHeight, centerY - halfRadiusBorder);
//        this.hexagonBorderPath.lineTo(centerX + triangleBorderHeight, centerY + halfRadiusBorder);
//        this.hexagonBorderPath.close();
//        invalidate();
//    }

    @Override
    public void onDraw(Canvas c) {
        c.drawPath(hexagonBorderPath, mBorderPaint);
        c.clipPath(hexagonPath, Region.Op.INTERSECT);
        c.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR);
        super.onDraw(c);
    }

    @Override
    public void onMeasure(int widthMeasureSpec, int heightMeasureSpec){
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        int width = MeasureSpec.getSize(widthMeasureSpec);
        int height = MeasureSpec.getSize(heightMeasureSpec);

        setMeasuredDimension(width, height);
        calculatePath(Math.min(width / 2f, height / 2f) - 20f);
    }

    public void setStrokeWidth(Integer strokeWidth) {
        this.strokeWidth = strokeWidth;
        init();
    }

    public void setStrokeColor(Integer strokeColor) {
        this.strokeColor = strokeColor;
        init();
    }
}
