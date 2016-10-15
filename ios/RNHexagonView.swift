//
//  RNHexagonView.swift
//

import UIKit

@objc(RNHexagonView)
class RNHexagonView: UIView {
  
  private var _borderColor: UIColor = .clearColor()
  private var _borderWidth: CGFloat = 0
  private var _backgroundColor: UIColor = .clearColor()
  private var _isHorizontal: Bool = false
  private var _size: CGFloat = 0
  
  private var backgroundLayer = CAShapeLayer()
  private var borderLayer = CAShapeLayer()
    
  var size: NSNumber? {
    set {
      let width = RCTConvert.CGFloat(newValue)
      self.frame = CGRect(x: 0, y: 0, width: width, height: width)
        setupHexagonImageView(self)
    }
    get {
      return nil
    }
  }
  
  var borderWidth: NSNumber? {
    set {
      self._borderWidth = RCTConvert.CGFloat(newValue)
      setupHexagonImageView(self)
    }
    get {
      return nil
    }
  }
  
  var borderColor: NSString? {
    set {
      if newValue != nil {
        let color = NSNumberFormatter().numberFromString(newValue! as String)
        self._borderColor = RCTConvert.UIColor(color)
        setupHexagonImageView(self)
      }
    }
    get {
      return nil
    }
  }
  
  var background_Color: NSString? {
    set {
      if newValue != nil {
        let color = NSNumberFormatter().numberFromString(newValue! as String)
        self._backgroundColor = RCTConvert.UIColor(color)
        setupHexagonImageView(self)
      }
    }
    get {
      return nil
    }
  }
  
  var isHorizontal: NSNumber? {
    set {
      if let horizontal = newValue {
        self._isHorizontal = RCTConvert.BOOL(horizontal)
        setupHexagonImageView(self)
      }
    }
    get {
      return nil
    }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupHexagonImageView(self)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func setupHexagonImageView(view: UIView) {
    let lineWidth = self._borderWidth
    let borderColor = self._borderColor
    let backgroundColor = self._backgroundColor
    let rotationOffset = self._isHorizontal ? CGFloat(M_PI) : CGFloat(M_PI / 2.0)
    
    let path = roundedPolygonPath(view.bounds, lineWidth: lineWidth, sides: 6, cornerRadius: 0, rotationOffset: rotationOffset)
    
    let mask = CAShapeLayer()
    mask.path = path.CGPath
    mask.lineWidth = lineWidth
    mask.strokeColor = UIColor.clearColor().CGColor
    mask.fillColor = UIColor.whiteColor().CGColor
    view.layer.mask = mask
    
    backgroundLayer.removeFromSuperlayer()
    borderLayer.removeFromSuperlayer()
    
    backgroundBorder = CAShapeLayer()
    backgroundBorder.path = path.CGPath
    backgroundBorder.lineWidth = lineWidth
    backgroundBorder.strokeColor = borderColor.CGColor
    backgroundBorder.fillColor = backgroundColor.CGColor
    view.layer.addSublayer(backgroundBorder)
    
    border = CAShapeLayer()
    border.path = path.CGPath
    border.lineWidth = lineWidth
    border.strokeColor = borderColor.CGColor
    border.fillColor = UIColor.clearColor().CGColor
    border.zPosition = 1
    view.layer.addSublayer(border)
  }
  
  func roundedPolygonPath(rect: CGRect, lineWidth: CGFloat, sides: NSInteger, cornerRadius: CGFloat, rotationOffset: CGFloat = 0)
    -> UIBezierPath {
      let path = UIBezierPath()
      let theta: CGFloat = CGFloat(2.0 * M_PI) / CGFloat(sides) // How much to turn at every corner
      //      let offset: CGFloat = cornerRadius * tan(theta / 2.0)     // Offset from which to start rounding corners
      let width = min(rect.size.width, rect.size.height)        // Width of the square
      
      let center = CGPoint(x: rect.origin.x + width / 2.0, y: rect.origin.y + (self._isHorizontal ? 0 : width) / 2.0)
      
      // Radius of the circle that encircles the polygon
      // Notice that the radius is adjusted for the corners, that way the largest outer
      // dimension of the resulting shape is always exactly the width - linewidth
      let radius = (width - lineWidth + cornerRadius - (cos(theta) * cornerRadius)) / 2.0
      
      // Start drawing at a point, which by default is at the right hand edge
      // but can be offset
      var angle = CGFloat(rotationOffset)
      
      let corner = CGPointMake(center.x + (radius - cornerRadius) * cos(angle), center.y + (radius - cornerRadius) * sin(angle))
      path.moveToPoint(CGPointMake(corner.x + cornerRadius * cos(angle + theta), corner.y + cornerRadius * sin(angle + theta)))
      
      for _ in 0 ..< sides {
        angle += theta
        
        let corner = CGPointMake(center.x + (radius - cornerRadius) * cos(angle), center.y + (radius - cornerRadius) * sin(angle))
        let tip = CGPointMake(center.x + radius * cos(angle), center.y + radius * sin(angle))
        let start = CGPointMake(corner.x + cornerRadius * cos(angle - theta), corner.y + cornerRadius * sin(angle - theta))
        let end = CGPointMake(corner.x + cornerRadius * cos(angle + theta), corner.y + cornerRadius * sin(angle + theta))
        
        path.addLineToPoint(start)
        path.addQuadCurveToPoint(end, controlPoint: tip)
      }
      
      path.closePath()
      
      // Move the path to the correct origins
      let bounds = path.bounds
      let transform = CGAffineTransformMakeTranslation(-bounds.origin.x + rect.origin.x + lineWidth / 2.0,
                                                       -bounds.origin.y + rect.origin.y + lineWidth / 2.0)
      path.applyTransform(transform)
      
      return path
  }
}

