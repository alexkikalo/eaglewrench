Optional: place oil-system.glb here.

Mesh names the loader understands (case-insensitive):
  oilPan / pan
  drainPlug / plug
  oilFilter / filter
  filterHousing / pad
  dipstick
  fillCap / cap
  oil

Keep the file under 50k triangles total. Then set NEXT_PUBLIC_USE_GLB=true.

Until that file exists the bay uses the built-in low-poly procedural system.
