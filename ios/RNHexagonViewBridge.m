//
//  RNHexagonViewBridge.m
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNHexagonViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(size, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(borderWidth, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(borderColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(background_Color, NSString)
RCT_EXPORT_VIEW_PROPERTY(isHorizontal, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(cornerRadius, NSNumber)

@end
