//
//  RNShapeViewBridge.m
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"
#import "RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNShapeViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(size, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(borderWidth, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(borderColor, NSString)
RCT_REMAP_VIEW_PROPERTY(background_Color, hexagonBackgroundColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(isHorizontal, NSNumber)

@end
