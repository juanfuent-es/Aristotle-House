import GUI from 'lil-gui'
import '../../styles/lil-gui.css'
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import type { OpticalMaterialSettings } from '../materials/OpticalMaterial'

interface MaterialGuiProps {
  setSettings: Dispatch<SetStateAction<OpticalMaterialSettings>>
}

export function MaterialGui({ setSettings }: MaterialGuiProps) {
  useEffect(() => {
    const values: OpticalMaterialSettings = {
      transmission: 0.78,
      thickness: 1.7,
      roughness: 0.1,
      ior: 1.52,
      chromaticAberration: 0.12,
      distortion: 0.16,
    }

    const gui = new GUI({ title: 'MATERIAL / REFRACTION', width: 300 })
    gui.domElement.classList.add('material-gui')

    const update = () => setSettings({ ...values })

    gui.add(values, 'transmission', 0, 1, 0.01).name('Transmission').onChange(update)
    gui.add(values, 'thickness', 0, 3, 0.01).name('Thickness').onChange(update)
    gui.add(values, 'roughness', 0, 1, 0.005).name('Roughness').onChange(update)
    gui.add(values, 'ior', 1, 2.33, 0.01).name('IOR').onChange(update)
    gui.add(values, 'chromaticAberration', 0, 0.3, 0.001).name('Chromatic').onChange(update)
    gui.add(values, 'distortion', 0, 1, 0.01).name('Distortion').onChange(update)

    return () => gui.destroy()
  }, [setSettings])

  return null
}
