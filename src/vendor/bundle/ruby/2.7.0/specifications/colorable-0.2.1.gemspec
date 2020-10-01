# -*- encoding: utf-8 -*-
# stub: colorable 0.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "colorable".freeze
  s.version = "0.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["kyoendo".freeze]
  s.date = "2018-06-07"
  s.description = "A simple color handler which provide a conversion between colorname, RGB, HSB and HEX".freeze
  s.email = ["postagie@gmail.com".freeze]
  s.homepage = "https://github.com/melborne/colorable".freeze
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.3".freeze)
  s.rubygems_version = "3.1.2".freeze
  s.summary = "A simple color handler which provide a conversion between colorname, RGB, HSB and HEX".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
  else
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
  end
end
