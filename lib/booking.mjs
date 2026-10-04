/** Pure frontend estimate. No availability service or booking persistence. */
export const rooms = [
  {
    id: "superior",
    name: "Superior",
    bed: "1 King",
    floor: "Bilik bawah",
    units: 2,
    capacity: 2,
    image: "/images/02.webp",
    photos: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  {
    id: "bunker",
    name: "Bunker",
    bed: "3 Single",
    floor: "Bilik bawah",
    units: 2,
    capacity: 3,
    image: "/images/16.webp",
    photos: [16, 17, 18, 19],
  },
  {
    id: "twin",
    name: "Twin",
    bed: "2 Single",
    floor: "Bilik atas",
    units: 2,
    capacity: 2,
    image: "/images/20.webp",
    photos: [20, 21, 22, 23, 24, 25],
  },
  {
    id: "deluxe",
    name: "Deluxe",
    bed: "1 Queen",
    floor: "Bilik atas",
    units: 2,
    capacity: 2,
    image: "/images/26.webp",
    photos: [26, 27, 28, 29, 30],
  },
];
export function estimateStay(from, to, whole = false, holiday = false) {
  if (!from || !to)
    return { error: "Sila pilih tarikh check-in dan check-out." };
  const start = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate(),
    12,
  );
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 12);
  if (end <= start) return { error: "Check-out mestilah selepas check-in." };
  let total = 0,
    nights = 0,
    hasSaturday = false;
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day === 6) hasSaturday = true;
    total += whole
      ? day === 6 || holiday
        ? 2000
        : day === 0 || day === 5
          ? 1600
          : 1200
      : holiday
        ? 250
        : day === 0 || day === 5
          ? 200
          : 150;
    nights++;
  }
  if (hasSaturday && !whole)
    return {
      error:
        "Penginapan pada malam Sabtu hanya untuk pakej seluruh StayRehat (8 unit).",
      nights,
      hasSaturday,
    };
  return { total, deposit: total * 0.5, nights, hasSaturday };
}
