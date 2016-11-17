//
//  RNHexagonView.swift
//

import UIKit

@objc(RNHexagonView)
class RNHexagonView: UIView {
    
    private var _borderColor: UIColor = .clear
    private var _borderWidth: CGFloat = 0
    private var _backgroundColor: UIColor = .clear
    private var _isHorizontal: Bool = false
    private var _size: CGFloat = 0
    private var _cornerRadius: CGFloat = 0
    
    private var borderLayer = CAShapeLayer()
    
    var size: NSNumber? {
        set {
            let newSize = RCTConvert.cgFloat(newValue)
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
            self._borderWidth = RCTConvert.cgFloat(newValue)
            self.setNeedsDisplay()
        }
        get {
            return nil
        }
    }
    
    var borderColor: NSString? {
        set {
            if newValue != nil {
                let color = NumberFormatter().number(from: newValue! as String)
                self._borderColor = RCTConvert.uiColor(color)
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
                let color = NumberFormatter().number(from: newValue! as String)
                self._backgroundColor = RCTConvert.uiColor(color)
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
                if self._isHorizontal != RCTConvert.bool(horizontal) {
                    self._isHorizontal = RCTConvert.bool(horizontal)
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
            self._cornerRadius = RCTConvert.cgFloat(newValue)
            self.setNeedsDisplay()
        }
        get {
            return nil
        }
    }
    
    override func draw(_ rect: CGRect) {
        super.draw(rect)
        setupHexagonView(view: self)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.backgroundColor = self._backgroundColor
        setupHexagonView(view: self)
    }
    
    func setupHexagonView(view: UIView) {
        let lineWidth = self._borderWidth
        let borderColor = self._borderColor
        let rotationOffset = self._isHorizontal ? CGFloat(M_PI) : CGFloat(M_PI / 2.0)
        let cornerRadius = self._cornerRadius
        
        let path = roundedPolygonPath(rect: view.bounds, lineWidth: lineWidth, sides: 6, cornerRadius: cornerRadius, rotationOffset: rotationOffset)
        
        let mask = CAShapeLayer()
        mask.path = path.cgPath
        mask.fillColor = UIColor.white.cgColor
        (self.layer as! CAShapeLayer).mask = mask
        
        borderLayer.removeFromSuperlayer()
        
        (self.layer as! CAShapeLayer).path = path.cgPath
        (self.layer as! CAShapeLayer).fillColor = nil
        
        borderLayer.path = path.cgPath
        borderLayer.lineWidth = lineWidth
        borderLayer.strokeColor = borderColor.cgColor
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
            
            let corner = CGPoint(x: center.x + (radius - cornerRadius) * cos(angle), y: center.y + (radius - cornerRadius) * sin(angle))
            path.move(to: CGPoint(x: corner.x + cornerRadius * cos(angle + theta), y: corner.y + cornerRadius * sin(angle + theta)))
            
            for _ in 0 ..< sides {
                angle += theta
                
                let corner = CGPoint(x: center.x + (radius - cornerRadius) * cos(angle), y: center.y + (radius - cornerRadius) * sin(angle))
                let tip = CGPoint(x: center.x + radius * cos(angle), y: center.y + radius * sin(angle))
                let start = CGPoint(x: corner.x + cornerRadius * cos(angle - theta), y: corner.y + cornerRadius * sin(angle - theta))
                let end = CGPoint(x: corner.x + cornerRadius * cos(angle + theta), y: corner.y + cornerRadius * sin(angle + theta))
                
                path.addLine(to: start)
                path.addQuadCurve(to: end, controlPoint: tip)
            }
            
            path.close()
            
            // Move the path to the correct origins
            let bounds = path.bounds
            let transform = CGAffineTransform(translationX: -bounds.origin.x + rect.origin.x + lineWidth / 2.0,
                                              y: -bounds.origin.y + rect.origin.y + lineWidth / 2.0)
            path.apply(transform)
            
            return path
    }
    
    override class var layerClass: AnyClass {
        return CAShapeLayer.self
    }
}
