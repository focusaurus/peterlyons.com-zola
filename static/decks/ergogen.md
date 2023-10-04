# Design a Custom Keyboard with Ergogen

Software Crafters Montréal

October 2023

---
# Ergonomic Keyboards

* designed to better fit your shoulders, arms, hands & fingers
* DIY/Maker scene is starting to bring price & effort way down

---
# Ergogen

* Ergogen can help you design a PCB for your keyboard
* https://ergogen.cache.works/
* [Ergogen Docs](https://deploy-preview-12--ergogen.netlify.app/outlines/)
* Input yaml data, get back out files for
  * Printed Circuit Board
    * Split or unibody
    * Reversible
    * Hot swap switches
    * KiCAD format
  * 3D printable bottom case
---
# yaml section

```yaml
 thumb:
      anchor:
        ref: fingers_inner_one
        shift: [0, -40]
        rotate: -10
      columns:
        outer:
          rows.one.rotate: -10
          rows.one.bind: [5,2,0,2]
        home:
          rows.one.rotate: -20
          rows.one.shift: [1, -5.5]
          rows.one.bind: [5,2,0,3.5]
        inner:
          rows.one.rotate: -30
          rows.one.shift: [1, -14]
          rows.one.bind: [4.5,2,0,4]
```

---
![KiCAD PCB preview](/ergogen/kicad-pcb.png)

---
![KiCAD PCB 3D render](/ergogen/kicad-3d.png)

---
# Demo

---

# The End

[peterlyons.com](https://peterlyons.com)

[recurse.social/@focusaurus](https://recurse.social/@focusaurus)

