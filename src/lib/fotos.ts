/**
 * Fotos de ejemplo en HD (plantillas MIT de StartBootstrap; originalmente de Unsplash).
 * Se reemplazan por las fotos reales de Fabián con el mismo nombre de archivo en src/assets/fotos/.
 * astro:assets las convierte a WebP en varios anchos.
 */
import retrato from '@/assets/fotos/retrato.png';
import escritorio from '@/assets/fotos/escritorio.jpg';
import camara from '@/assets/fotos/camara.jpg';
import libreta from '@/assets/fotos/libreta.jpg';
import niebla from '@/assets/fotos/niebla.jpg';
import codigo from '@/assets/fotos/codigo.jpg';
import type { Lang } from '@/i18n/ui';

export const fotos = { retrato, escritorio, camara, libreta, niebla, codigo };

export const altFotos: Record<Lang, Record<keyof typeof fotos, string>> = {
  es: {
    retrato: 'Retrato de Fabián Rodas con camisa oscura y los brazos cruzados (foto de ejemplo)',
    escritorio: 'Escritorio de madera con un portátil abierto y una silla blanca',
    camara: 'Cámara, mapa, libreta y mochila sobre una mesa',
    libreta: 'Libreta abierta, teléfono, lentes y portátil sobre un escritorio blanco',
    niebla: 'Montañas cubiertas de niebla en blanco y negro',
    codigo: 'Código HTML en la pantalla de un editor',
  },
  en: {
    retrato: 'Portrait of Fabián Rodas in a dark shirt with arms crossed (sample photo)',
    escritorio: 'Wooden desk with an open laptop and a white chair',
    camara: 'Camera, map, notebook and backpack on a table',
    libreta: 'Open notebook, phone, glasses and laptop on a white desk',
    niebla: 'Mountains covered in fog, in black and white',
    codigo: 'HTML code on an editor screen',
  },
};
