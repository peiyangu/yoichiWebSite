/**
 * 会場マップ（public/map/map.jpg, 1522x1076px）上の各ブース番号の位置データ。
 *
 * 画像内に手書きで配置された番号ボックスの座標を自動検出（OpenCV + OCR）し、
 * 画像サイズに対する割合（%）で保持している。レスポンシブな画像表示でも
 * 追加の再計算なしにそのまま重ねて配置できる。
 *
 * ブース番号 "87" は元の会場マップ上で2箇所に重複して記載されている
 * （主催者提供の配置図どおり）。
 *
 * 店舗とブース番号の紐付け（data/stores.ts の boothNumber）は
 * 後日追加予定。紐付けが入力されると、このマップは自動的に該当店舗を
 * 表示するようになる。
 */
export interface VenueMapArea {
  booth: string;
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
}

export const VENUE_MAP_IMAGE = "/map/map.jpg";
export const VENUE_MAP_IMAGE_WIDTH = 1522;
export const VENUE_MAP_IMAGE_HEIGHT = 1076;

export const VENUE_MAP_AREAS: VenueMapArea[] = [
  { booth: "1", xPct: 19.382, yPct: 13.941, wPct: 2.694, hPct: 3.717 },
  { booth: "2", xPct: 27.004, yPct: 12.454, wPct: 2.628, hPct: 3.81 },
  { booth: "3", xPct: 29.369, yPct: 12.454, wPct: 2.628, hPct: 3.81 },
  { booth: "4", xPct: 31.735, yPct: 12.454, wPct: 2.628, hPct: 3.81 },
  { booth: "5", xPct: 27.201, yPct: 17.379, wPct: 2.694, hPct: 3.717 },
  { booth: "6", xPct: 27.201, yPct: 21.097, wPct: 2.694, hPct: 3.717 },
  { booth: "7", xPct: 29.369, yPct: 25.929, wPct: 2.628, hPct: 3.81 },
  { booth: "8", xPct: 31.735, yPct: 25.929, wPct: 2.628, hPct: 3.81 },
  { booth: "9", xPct: 38.83, yPct: 9.572, wPct: 2.234, hPct: 3.253 },
  { booth: "10", xPct: 40.736, yPct: 9.572, wPct: 2.3, hPct: 3.253 },
  { booth: "11", xPct: 42.707, yPct: 9.572, wPct: 2.234, hPct: 3.253 },
  { booth: "12", xPct: 44.678, yPct: 9.572, wPct: 2.234, hPct: 3.253 },
  { booth: "13", xPct: 46.649, yPct: 9.572, wPct: 2.234, hPct: 3.253 },
  { booth: "14", xPct: 38.108, yPct: 18.587, wPct: 2.694, hPct: 3.717 },
  { booth: "15", xPct: 42.838, yPct: 18.587, wPct: 2.694, hPct: 3.717 },
  { booth: "16", xPct: 46.386, yPct: 18.309, wPct: 2.628, hPct: 3.81 },
  { booth: "17", xPct: 46.386, yPct: 21.654, wPct: 2.628, hPct: 3.717 },
  { booth: "18", xPct: 46.386, yPct: 25.0, wPct: 2.628, hPct: 3.717 },
  { booth: "19", xPct: 46.386, yPct: 28.346, wPct: 2.628, hPct: 3.717 },
  { booth: "20", xPct: 38.108, yPct: 31.32, wPct: 2.694, hPct: 3.717 },
  { booth: "21", xPct: 40.473, yPct: 31.32, wPct: 2.694, hPct: 3.717 },
  { booth: "22", xPct: 42.838, yPct: 31.32, wPct: 2.694, hPct: 3.717 },
  { booth: "23", xPct: 36.268, yPct: 40.242, wPct: 2.628, hPct: 3.717 },
  { booth: "24", xPct: 38.633, yPct: 40.242, wPct: 2.628, hPct: 3.717 },
  { booth: "25", xPct: 40.999, yPct: 40.242, wPct: 2.628, hPct: 3.717 },
  { booth: "26", xPct: 43.364, yPct: 40.242, wPct: 2.628, hPct: 3.717 },
  { booth: "27", xPct: 45.729, yPct: 40.242, wPct: 2.628, hPct: 3.717 },
  { booth: "28", xPct: 17.543, yPct: 49.257, wPct: 2.628, hPct: 3.81 },
  { booth: "29", xPct: 25.296, yPct: 53.532, wPct: 2.694, hPct: 3.717 },
  { booth: "30", xPct: 27.661, yPct: 53.532, wPct: 2.694, hPct: 3.717 },
  { booth: "31", xPct: 30.026, yPct: 53.532, wPct: 2.694, hPct: 3.717 },
  { booth: "32", xPct: 25.296, yPct: 58.457, wPct: 2.694, hPct: 3.717 },
  { booth: "33", xPct: 25.296, yPct: 61.803, wPct: 2.694, hPct: 3.717 },
  { booth: "34", xPct: 33.509, yPct: 50.186, wPct: 2.628, hPct: 3.717 },
  { booth: "35", xPct: 35.874, yPct: 50.186, wPct: 2.628, hPct: 3.717 },
  { booth: "36", xPct: 38.239, yPct: 50.186, wPct: 2.628, hPct: 3.717 },
  { booth: "37", xPct: 40.604, yPct: 50.186, wPct: 2.628, hPct: 3.717 },
  { booth: "38", xPct: 42.97, yPct: 50.186, wPct: 2.628, hPct: 3.717 },
  { booth: "39", xPct: 35.874, yPct: 53.532, wPct: 2.628, hPct: 3.717 },
  { booth: "40", xPct: 38.239, yPct: 53.532, wPct: 2.628, hPct: 3.717 },
  { booth: "41", xPct: 40.604, yPct: 53.532, wPct: 2.628, hPct: 3.717 },
  { booth: "42", xPct: 42.97, yPct: 53.532, wPct: 2.628, hPct: 3.717 },
  { booth: "43", xPct: 49.671, yPct: 45.446, wPct: 2.628, hPct: 3.81 },
  { booth: "44", xPct: 52.037, yPct: 45.446, wPct: 2.628, hPct: 3.81 },
  { booth: "45", xPct: 54.402, yPct: 45.446, wPct: 2.628, hPct: 3.81 },
  { booth: "46", xPct: 64.455, yPct: 40.335, wPct: 2.694, hPct: 3.717 },
  { booth: "47", xPct: 66.82, yPct: 40.335, wPct: 2.694, hPct: 3.717 },
  { booth: "48", xPct: 69.185, yPct: 40.335, wPct: 2.694, hPct: 3.717 },
  { booth: "49", xPct: 64.455, yPct: 49.349, wPct: 2.694, hPct: 3.717 },
  { booth: "50", xPct: 68.2, yPct: 30.483, wPct: 2.628, hPct: 3.81 },
  { booth: "51", xPct: 70.565, yPct: 34.201, wPct: 2.694, hPct: 3.81 },
  { booth: "52", xPct: 73.39, yPct: 40.335, wPct: 2.694, hPct: 3.717 },
  { booth: "53", xPct: 77.004, yPct: 48.42, wPct: 2.628, hPct: 3.717 },
  { booth: "54", xPct: 78.252, yPct: 52.881, wPct: 2.628, hPct: 3.717 },
  { booth: "55", xPct: 79.304, yPct: 57.342, wPct: 2.628, hPct: 3.81 },
  { booth: "56", xPct: 80.289, yPct: 61.617, wPct: 2.628, hPct: 3.717 },
  { booth: "57", xPct: 80.946, yPct: 65.799, wPct: 2.694, hPct: 3.717 },
  { booth: "58", xPct: 81.735, yPct: 70.446, wPct: 2.628, hPct: 3.81 },
  { booth: "59", xPct: 82.194, yPct: 75.093, wPct: 2.694, hPct: 3.81 },
  { booth: "60", xPct: 31.078, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "61", xPct: 33.443, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "62", xPct: 35.808, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "63", xPct: 38.173, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "64", xPct: 40.539, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "65", xPct: 42.904, yPct: 63.197, wPct: 2.694, hPct: 3.81 },
  { booth: "66", xPct: 45.335, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "67", xPct: 47.7, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "68", xPct: 50.066, yPct: 63.197, wPct: 2.694, hPct: 3.81 },
  { booth: "69", xPct: 52.497, yPct: 63.197, wPct: 2.628, hPct: 3.81 },
  { booth: "70", xPct: 70.959, yPct: 27.138, wPct: 3.942, hPct: 5.483 },
  { booth: "71", xPct: 73.85, yPct: 31.784, wPct: 4.008, hPct: 5.855 },
  { booth: "72", xPct: 76.807, yPct: 37.268, wPct: 3.679, hPct: 5.483 },
  { booth: "73", xPct: 78.909, yPct: 42.844, wPct: 3.482, hPct: 5.297 },
  { booth: "74", xPct: 80.749, yPct: 48.699, wPct: 3.548, hPct: 5.669 },
  { booth: "75", xPct: 82.392, yPct: 55.297, wPct: 3.417, hPct: 5.576 },
  { booth: "76", xPct: 83.706, yPct: 61.803, wPct: 3.351, hPct: 5.576 },
  { booth: "77", xPct: 84.823, yPct: 68.773, wPct: 2.957, hPct: 4.926 },
  { booth: "78", xPct: 85.348, yPct: 75.651, wPct: 2.825, hPct: 4.74 },
  { booth: "79", xPct: 85.742, yPct: 81.97, wPct: 2.891, hPct: 4.833 },
  { booth: "80", xPct: 82.523, yPct: 89.684, wPct: 4.074, hPct: 5.019 },
  { booth: "81", xPct: 77.924, yPct: 91.914, wPct: 3.942, hPct: 4.833 },
  { booth: "82", xPct: 73.062, yPct: 93.494, wPct: 3.482, hPct: 3.717 },
  { booth: "83", xPct: 68.463, yPct: 93.03, wPct: 3.614, hPct: 4.089 },
  { booth: "84", xPct: 40.473, yPct: 18.587, wPct: 2.694, hPct: 3.717 },
  { booth: "85", xPct: 46.386, yPct: 31.784, wPct: 2.628, hPct: 3.717 },
  { booth: "86", xPct: 64.389, yPct: 20.167, wPct: 3.154, hPct: 3.717 },
  { booth: "87", xPct: 68.003, yPct: 22.677, wPct: 3.942, hPct: 5.483 },
];
