//
//  RNHexagonViewManager.swift
//


import UIKit

@objc(RNHexagonViewManager)
class RNHexagonViewManager: RCTViewManager {
  
  @objc override func view() -> UIView! {
    return RNHexagonView()
  }
}
