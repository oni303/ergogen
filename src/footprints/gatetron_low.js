// Any MX low profile switch
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible 
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//
// note: hotswap and reverse can be used simultaneously
module.exports = {
  nets: {
    from: undefined,
    to: undefined
  },
  params: {
      class: 'S',
      hotswap: false,
      reverse: false,
      keycaps: false
  },
  body: p => {
    const standard = `
      (module Gatetron-Low-Profile (layer F.Cu) (tedit 5B8593EA)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 -7.14375 180) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.2))))
      (fp_text value "" (at 0 -5.08 180) (layer F.SilkS) hide (effects (font (size 1.2 1.2) (thickness 0.2032))))

      ${''/* corner marks */}
      (fp_line (start 6.95 6.95) (end -6.95 6.95) (layer Cmts.User) (width 0.1524))
      (fp_line (start -6.95 6.95) (end -6.95 -6.95) (layer Cmts.User) (width 0.1524))
      (fp_line (start -6.95 -6.95) (end 6.95 -6.95) (layer Cmts.User) (width 0.1524))
      (fp_line (start 6.95 -6.95) (end 6.95 6.95) (layer Cmts.User) (width 0.1524))
      (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.1524))
      (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.1524))
      (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.1524))
      (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.1524))
      (fp_line (start 7.5 7.5) (end -7.5 7.5) (layer Eco2.User) (width 0.1524))
      (fp_line (start -7.5 7.5) (end -7.5 -7.5) (layer Eco2.User) (width 0.1524))
      (fp_line (start -7.5 -7.5) (end 7.5 -7.5) (layer Eco2.User) (width 0.1524))
      (fp_line (start 7.5 -7.5) (end 7.5 7.5) (layer Eco2.User) (width 0.1524))
    
      ${''/* middle shaft */}
      (pad "" np_thru_hole circle (at 0 0 180) (size 5.00 5.00) (drill 5.00) (layers *.Cu *.Mask))

      ${''/* stabilizers */}
      (pad "" np_thru_hole circle (at 0 0 180) (size 6.25 6.25) (drill 6.25) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 0 3.7 180) (size 2.3 2.3) (drill 2.3) (layers *.Cu *.Mask))
      `
    const keycap = `
      ${'' /* keycap marks */}
      (fp_line (start -9.5 -9.5) (end 9.5 -9.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9.5 -9.5) (end 9.5 9.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9.5 9.5) (end -9.5 9.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start -9.5 9.5) (end -9.5 -9.5) (layer Dwgs.User) (width 0.15))
      `
    function pins(def_neg, def_pos, def_side) {
      if(p.param.hotswap) {
	return `
          ${''/* pins */}
          (pad 1 thru_hole circle (at ${def_pos}2.6 5.75 180) (size 2.5 2.5) (drill 1.53) (layers *.Cu *.Mask) ${p.net.from.str})
          (pad 2 thru_hole circle (at ${def_neg}4.4 4.7 41.9) (size 2.5 2.5) (drill 1.53) (layers *.Cu *.Mask) ${p.net.to.str})
        `
      } else {
	return `
          ${''/* pins */}
          (pad 1 thru_hole circle (at ${def_pos}2.6 5.75 180) (size 2 2) (drill 1.2) (layers *.Cu *.Mask) ${p.net.from.str})
          (pad 2 thru_hole circle (at ${def_neg}4.4 4.7 41.9) (size 2 2) (drill 1.2) (layers *.Cu *.Mask) ${p.net.to.str})
        `
      }
    }
    if(p.param.reverse){
      return `
        ${standard}
        ${p.param.keycaps ? keycap : ''}
        ${pins('-', '', 'B')}
        ${pins('', '-', 'F')})
        `
    } else {
      return `
        ${standard}
        ${p.param.keycaps ? keycap : ''}
        ${pins('-', '', 'B')})
        `
    }
  }
}
