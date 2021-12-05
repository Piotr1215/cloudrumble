# PlantUML Tips&Tricks

## Sequence Diagram shapes

- actor
- boundary
- control
- entity
- database
- collections

## Use Participant in Sequence Diagrams

``` PlantUML
!include <aws/common>
!include <aws/Storage/AmazonS3/AmazonS3>
!include <aws/Storage/AmazonS3/bucket/bucket>

participant "<color:red><$bucket>" as one
participant "<$bucket>" as two
one -> two
two --> one
```

## Useful Skinparams

- skinparam defaultTextAlignment center
- skinparam titleFontSize 24
- skinparam Linetype polyline, ortho
- skinparam nodesep 10
- skinparam ranksep 20

## Controlling Layout

- c4 -[norank]-> c2
- use `!pragma layout elk` to simplify layout with [Eclipse Layout Kernel](https://www.eclipse.org/elk/)

## Embedding images into diagrams

``` PlantUML
@startuml Embed Images Into Diagram
'Define sprite first and point it to existing file (here assumtion is that file exists in the same directory as *.puml file)

'Create sprite
sprite tux triangle.png

'Declare participant as sprite
participant "Hello <$tux>" as hello

'Use it as embedded image anywhere in text (this uses creole engine)
hello->World : I am a triangle <$tux>, who are you?
@enduml
```

**IMPORTANT** this will NOT render correctly in VS Code Plugin Preview.

https://www.augmentedmind.de/2021/01/17/plantuml-layout-tutorial-styles/
