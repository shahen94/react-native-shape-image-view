//
//  RNShapeViewManager.swift
//


import UIKit

@objc(RNShapeViewManager)
class RNShapeViewManager: RCTViewManager {
  
  @objc override func view() -> UIView! {
    let view = RNShapeView(frame: CGRect(x: 0, y: 0, width: 0, height: 0))
    return view
  }
}
