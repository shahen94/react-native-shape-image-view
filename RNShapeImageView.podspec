require 'json'

Pod::Spec.new do |s|
  package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

  s.name          = "RNShapeImageView"
  s.version       = package['version']
  s.summary       = package['description']
  s.authors       = { "Shahen Hovhannisyan" => "shahen.hovhannisyan.94@gmail.com" }
  s.homepage      = "https://github.com/shahen94/react-native-shape-image-view#readme"
  s.license       = "MIT"
  s.platforms     = { :ios => "8.0", :tvos => "9.0" }
  s.requires_arc  = true
  s.source        = { :git => "https://github.com/shahen94/react-native-shape-image-view.git" }
  s.source_files  = "ios/**/*.{h,m}"

  s.dependency 'React'
end
