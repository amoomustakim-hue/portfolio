/**
 * Where the persistent 3D object is, in viewport terms. Hero and Contact
 * tween these from their ScrollTriggers; HeroObject reads them every frame
 * and only renders while `opacity` > 0. Kept apart from the WebGL module so
 * importing it never pulls three.js into the main bundle.
 *
 * x / y: fractions of the viewport from its centre. scale: relative to a
 * third of the viewport height. amp: surface turbulence.
 */
export const blob = { x: 0.2, y: 0, scale: 1, opacity: 0, amp: 1 }
