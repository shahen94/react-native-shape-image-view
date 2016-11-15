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
  private var _cornerRadius: CGFloat = 0
  
  private var borderLayer = CAShapeLayer()
    
  var size: NSNumber? {
    set {
      let newSize = RCTConvert.CGFloat(newValue)
      self.frame.size.width = newSize
      self.frame.size.height = newSize
      self.setNeedsDisplay()
    }
    get {
      return nil
    }
  }
  
  var borderWidth: NSNumber? {
    set {
      self._borderWidth = RCTConvert.CGFloat(newValue)
      self.setNeedsDisplay()
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
        self.setNeedsDisplay()
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
        self.setNeedsDisplay()
      }
    }
    get {
      return nil
    }
  }
  
  var isHorizontal: NSNumber? {
    set {
      if let horizontal = newValue {
        if self._isHorizontal != RCTConvert.BOOL(horizontal) {
          self._isHorizontal = RCTConvert.BOOL(horizontal)
          self.setNeedsDisplay()
        }
      }
    }
    get {
      return nil
    }
  }
  
  var cornerRadius: NSNumber? {
    set {
      self._cornerRadius = RCTConvert.CGFloat(newValue)
      self.setNeedsDisplay()
    }
    get {
      return nil
    }
  }
  
  override func drawRect(rect: CGRect) {
    super.drawRect(rect)
    setupHexagonView(self)
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    self.backgroundColor = self._backgroundColor
    setupHexagonView(self)
  }
  
  func setupHexagonView(view: UIView) {
    let lineWidth = self._borderWidth
    let borderColor = self._borderColor
    let rotationOffset = self._isHorizontal ? CGFloat(M_PI) : CGFloat(M_PI / 2.0)
    let cornerRadius = self._cornerRadius
    
    let path = roundedPolygonPath(view.bounds, lineWidth: lineWidth, sides: 6, cornerRadius: cornerRadius, rotationOffset: rotationOffset)
    
    let mask = CAShapeLayer()
    mask.path = path.CGPath
    mask.fillColor = UIColor.whiteColor().CGColor
    (self.layer as! CAShapeLayer).mask = mask
    
    borderLayer.removeFromSuperlayer()
    
    (self.layer as! CAShapeLayer).path = path.CGPath
    (self.layer as! CAShapeLayer).fillColor = nil
    
    borderLayer.path = path.CGPath
    borderLayer.lineWidth = lineWidth
    borderLayer.strokeColor = borderColor.CGColor
    borderLayer.fillColor = nil
    (self.layer as! CAShapeLayer).addSublayer(borderLayer)
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
  
  override class func layerClass() -> AnyClass {
    return CAShapeLayer.self
  }
}

